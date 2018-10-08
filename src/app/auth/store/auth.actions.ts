import { Action } from '@ngrx/store';
import { Authentication } from './auth.model';

export enum AuthActionTypes {
  SetupAuthentication = '[Auth] Setup Authentication',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  ClearLocalStorage = '[Auth] Clear Local Storage',
  HandleAuthentication = '[Auth] Handle Authentication',
  HandleAuthenticationError = '[Auth] Handle Authentication Error'
}

export class SetupAuthentication implements Action {
  readonly type = AuthActionTypes.SetupAuthentication;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: { redirectUrl: string; options: auth0.AuthorizeOptions }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class ClearLocalStorage implements Action {
  readonly type = AuthActionTypes.ClearLocalStorage;
}

export class HandleAuthentication implements Action {
  readonly type = AuthActionTypes.HandleAuthentication;

  constructor(public payload: { auth: Authentication }) {}
}

export class HandleAuthenticationError implements Action {
  readonly type = AuthActionTypes.HandleAuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type AuthActions =
  | SetupAuthentication
  | Login
  | Logout
  | ClearLocalStorage
  | HandleAuthentication
  | HandleAuthenticationError;
