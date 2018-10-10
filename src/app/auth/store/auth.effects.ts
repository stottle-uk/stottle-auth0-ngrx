import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRouter from '../../router-client/store';
import { AuthProviderService } from '../services/auth-provider.service';
import * as fromActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthProviderService) {}

  @Effect()
  handleAuthentication$: Observable<Action> = this.actions$.pipe(
    take(1),
    exhaustMap(() =>
      this.auth.handleAuthentication().pipe(
        map(
          auth =>
            new fromActions.UserIsAuthenticated({
              auth
            })
        ),
        catchError(error => of(new fromActions.HandleAuthenticationError({ error })))
      )
    )
  );

  @Effect()
  setupAuthentication$: Observable<Action> = this.actions$.pipe(
    take(1),
    map(() => new fromActions.CheckAuthenticationStatus())
  );

  @Effect()
  checkAuthenticationStatus$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.CheckAuthenticationStatus>(
      fromActions.AuthActionTypes.CheckAuthenticationStatus
    ),
    map(() => this.auth.getAuthState()),
    map(
      authState =>
        !!authState.accessToken &&
        !!authState.expiresAt &&
        new Date().getTime() < +authState.expiresAt
          ? new fromActions.UserIsAuthenticated({
              auth: authState
            })
          : new fromActions.UserIsNotAuthenticated()
    )
  );

  @Effect()
  userIsAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.UserIsAuthenticated>(fromActions.AuthActionTypes.UserIsAuthenticated),
    map(action => action.payload.auth),
    map(
      auth =>
        new fromActions.HandleAuthentication({
          auth
        })
    )
  );

  @Effect({ dispatch: false })
  login$: Observable<void> = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload.options),
    map(options => this.auth.login(options))
  );

  @Effect({ dispatch: false })
  loginSaveRedirectUrl$: Observable<void> = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload.redirectUrl),
    tap(redirectUrl => (this.auth.redirectUrl = redirectUrl)),
    switchMap(() => EMPTY)
  );

  @Effect({ dispatch: false })
  logout$: Observable<void> = this.actions$.pipe(
    ofType<fromActions.Logout>(fromActions.AuthActionTypes.Logout),
    map(() => this.auth.logout())
  );

  @Effect()
  getUserInfoStart$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.GetUserInfoStart>(fromActions.AuthActionTypes.GetUserInfoStart),
    switchMap(() =>
      this.auth.getUserInfo().pipe(
        map(userInfo => new fromActions.GetUserInfoSuccess({ userInfo })),
        catchError(error => of(new fromActions.GetUserInfoFailure({ error })))
      )
    )
  );

  @Effect()
  changePasswordStart$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ChangePasswordStart>(fromActions.AuthActionTypes.ChangePasswordStart),
    map(action => action.payload.options),
    switchMap(options =>
      this.auth.changePassword(options).pipe(
        map(() => new fromActions.ChangePasswordSuccess()),
        catchError(error => of(new fromActions.ChangePasswordFailure({ error })))
      )
    )
  );

  @Effect()
  handleAuthenticationRedirectUser$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.HandleAuthentication>(fromActions.AuthActionTypes.HandleAuthentication),
    map(action => action.payload.auth),
    tap(() => (this.auth.redirectUrl = null)),
    filter(auth => !!auth.redirectUrl),
    take(1),
    map(
      auth =>
        new fromRouter.Go({
          path: [auth.redirectUrl]
        })
    )
  );

  @Effect()
  handleAuthenticationGetUserInfoStart$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.HandleAuthentication>(fromActions.AuthActionTypes.HandleAuthentication),
    map(() => new fromActions.GetUserInfoStart())
  );

  // Renew Sessions

  @Effect()
  handleAuthenticationScheduleRenewal$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.HandleAuthentication>(fromActions.AuthActionTypes.HandleAuthentication),
    map(() => new fromActions.ScheduleSessionRenewal())
  );

  @Effect()
  renewSessionStart$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.RenewSessionStart>(fromActions.AuthActionTypes.RenewSessionStart),
    switchMap(() =>
      this.auth.renewAuthentication().pipe(
        map(() => new fromActions.RenewSessionSuccess()),
        catchError(error => of(new fromActions.RenewSessionFailure({ error })))
      )
    )
  );

  @Effect()
  scheduleSessionRenewal$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.ScheduleSessionRenewal>(fromActions.AuthActionTypes.ScheduleSessionRenewal),
    switchMap(() =>
      this.auth.scheduleRenewal().pipe(
        map(() => new fromActions.RenewSessionSuccess()),
        catchError(error => of(new fromActions.RenewSessionFailure({ error })))
      )
    )
  );

  @Effect()
  renewSessionSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.RenewSessionSuccess>(fromActions.AuthActionTypes.RenewSessionSuccess),
    map(() => new fromActions.ScheduleSessionRenewal())
  );

  // User is not authenticated

  @Effect()
  logoutUserIsNotAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.Logout>(fromActions.AuthActionTypes.Logout),
    map(() => new fromActions.UserIsNotAuthenticated())
  );

  @Effect()
  userIsNotAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.UserIsNotAuthenticated>(fromActions.AuthActionTypes.UserIsNotAuthenticated),
    map(() => new fromActions.ClearLocalStorage())
  );

  @Effect({ dispatch: false })
  clearLocalStorage$: Observable<void> = this.actions$.pipe(
    ofType<fromActions.ClearLocalStorage>(fromActions.AuthActionTypes.ClearLocalStorage),
    map(() => this.auth.clearLocalStorage())
  );
}
