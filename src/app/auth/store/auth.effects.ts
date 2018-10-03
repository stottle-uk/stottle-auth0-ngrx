import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import * as fromRouter from '../../router-client/store';
import { AuthProviderService } from '../services/auth-provider.service';
import * as fromActions from './auth.actions';
import { State } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthProviderService,
    private store: Store<State>
  ) {}

  @Effect()
  setupAuthentication$ = this.actions$.pipe(
    take(1),
    map(() => new fromActions.SetupAuthentication())
  );

  @Effect()
  setupAuthenticationIsAuthenticated$ = this.actions$.pipe(
    ofType<fromActions.SetupAuthentication>(fromActions.AuthActionTypes.SetupAuthentication),
    map(() => this.auth.getAuthState()),
    map(
      authState =>
        !!authState.accessToken &&
        !!authState.expiresAt &&
        new Date().getTime() < +authState.expiresAt
          ? new fromActions.HandleAuthentication({
              auth: authState
            })
          : new fromActions.ClearLocalStorage()
    )
  );

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload.options),
    map(options => this.auth.login(options))
  );

  @Effect({ dispatch: false })
  loginSaveRedirectUrl$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload.redirectUrl),
    tap(redirectUrl => (this.auth.redirectUrl = redirectUrl))
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<fromActions.Logout>(fromActions.AuthActionTypes.Logout),
    map(
      () =>
        new fromRouter.Go({
          path: ['/']
        })
    )
  );

  @Effect()
  logoutClearLocalStorage$ = this.actions$.pipe(
    ofType<fromActions.Logout>(fromActions.AuthActionTypes.Logout),
    map(() => new fromActions.ClearLocalStorage())
  );

  @Effect()
  handleAuthentication$ = this.actions$.pipe(
    take(1),
    exhaustMap(() =>
      this.auth.handleAuthentication().pipe(
        map(
          auth =>
            new fromActions.HandleAuthentication({
              auth
            })
        ),
        catchError(error => of(new fromActions.HandleAuthenticationError({ error })))
      )
    )
  );

  @Effect()
  handleAuthenticationRedirectUser$ = this.actions$.pipe(
    ofType<fromActions.HandleAuthentication>(fromActions.AuthActionTypes.HandleAuthentication),
    map(action => action.payload.auth),
    map(
      auth =>
        new fromRouter.Go({
          path: [auth.redirectUrl]
        })
    )
  );

  @Effect({ dispatch: false })
  clearLocalStorage$ = this.actions$.pipe(
    ofType<fromActions.ClearLocalStorage>(fromActions.AuthActionTypes.ClearLocalStorage),
    map(() => this.auth.clearLocalStorage())
  );
}
