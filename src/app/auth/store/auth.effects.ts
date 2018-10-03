import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, take } from 'rxjs/operators';
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
    filter(authState => !!authState.accessToken && !!authState.expiresAt),
    filter(authState => new Date().getTime() < +authState.expiresAt),
    take(1),
    map(
      auth =>
        new fromActions.HandleAuthentication({
          auth
        })
    )
  );

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(() => this.auth.login())
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<fromActions.Logout>(fromActions.AuthActionTypes.Logout),
    map(() => this.auth.logout())
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
}
