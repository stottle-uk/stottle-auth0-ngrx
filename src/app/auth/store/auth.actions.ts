import { Action } from "@ngrx/store";
import { Auth } from "./auth.model";

export enum AuthActionTypes {
  HandleAuthentication = "[Auth] Handle Authentication"
}

export class HandleAuthentication implements Action {
  readonly type = AuthActionTypes.HandleAuthentication;

  constructor(public payload: { auth: Auth }) {}
}

export type AuthActions = HandleAuthentication;
