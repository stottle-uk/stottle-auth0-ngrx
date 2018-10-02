import { Action } from '@ngrx/store';
import { Auth } from './auth.model';

export enum AuthActionTypes {
  HandleAuthentication = '[Auth] Handle Authentication',
  HandleAuthenticationError = '[Auth] Handle Authentication Error'
}

export class HandleAuthentication implements Action {
  readonly type = AuthActionTypes.HandleAuthentication;

  constructor(public payload: { auth: Auth }) {}
}

export class HandleAuthenticationError implements Action {
  readonly type = AuthActionTypes.HandleAuthenticationError;

  constructor(public payload: { error: auth0.Auth0Error }) {}
}

export type AuthActions = HandleAuthentication | HandleAuthenticationError;
