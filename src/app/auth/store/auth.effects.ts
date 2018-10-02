import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthActionTypes } from "./auth.actions";

@Injectable()
export class AuthEffects {
  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(AuthActionTypes.HandleAuthentication));

  constructor(private actions$: Actions) {}
}
