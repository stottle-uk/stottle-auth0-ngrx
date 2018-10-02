import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, first, map } from 'rxjs/operators';
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
    first(),
    map(() => new fromActions.SetupAuthentication())
  );

  @Effect()
  setupAuthenticationIsAuthenticated$ = this.actions$.pipe(
    ofType<fromActions.SetupAuthentication>(
      fromActions.AuthActionTypes.SetupAuthentication
    ),
    map(() => this.auth.getAuthState()),
    first(authState => !!authState.accessToken && !!authState.expiresAt),
    first(authState => new Date().getTime() < +authState.expiresAt),
    map(
      auth =>
        new fromActions.HandleAuthentication({
          auth
        })
    )
  );

  @Effect()
  handleAuthentication$ = this.actions$.pipe(
    first(),
    exhaustMap(() =>
      this.auth.handleAuthentication().pipe(
        map(
          auth =>
            new fromActions.HandleAuthentication({
              auth
            })
        ),
        catchError(error =>
          of(new fromActions.HandleAuthenticationError({ error }))
        )
      )
    )
  );
}
