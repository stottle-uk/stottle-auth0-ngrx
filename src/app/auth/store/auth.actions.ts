import { Action } from '@ngrx/store';
import { Auth } from './auth.model';

export enum AuthActionTypes {
  SetupAuthentication = '[Auth] Setup Authentication',
  Login = '[Auth] Login',
  Logout = '[Auth] Login',
  HandleAuthentication = '[Auth] Handle Authentication',
  HandleAuthenticationError = '[Auth] Handle Authentication Error'
}

export class SetupAuthentication implements Action {
  readonly type = AuthActionTypes.SetupAuthentication;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class HandleAuthentication implements Action {
  readonly type = AuthActionTypes.HandleAuthentication;

  constructor(public payload: { auth: Auth }) {}
}

export class HandleAuthenticationError implements Action {
  readonly type = AuthActionTypes.HandleAuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type AuthActions =
  | SetupAuthentication
  | Login
  | Logout
  | HandleAuthentication
  | HandleAuthenticationError;
