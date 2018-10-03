import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
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
          : new fromActions.Logout()
    )
  );

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(() => this.auth.login())
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<fromActions.Logout>(fromActions.AuthActionTypes.Logout),
    map(() => this.auth.logout()),
    map(
      () =>
        new fromRouter.Go({
          path: ['/']
        })
    )
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
    map(
      () =>
        new fromRouter.Go({
          path: ['/']
        })
    )
  );
}
