import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, first, map } from 'rxjs/operators';
import { AuthProviderService } from '../services/auth-provider.service';
import * as fromActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthProviderService) {}

  @Effect()
  init$ = this.actions$.pipe(
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
