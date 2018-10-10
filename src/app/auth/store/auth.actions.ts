import { Action } from '@ngrx/store';
import { Authentication } from './auth.model';

export enum AuthActionTypes {
  CheckAuthenticationStatus = '[Auth] Check Authentication Status',
  UserIsAuthenticated = '[Auth] User Is Authenticated',
  UserIsNotAuthenticated = '[Auth] User Is Not Authenticated',
  Login = '[Auth] Login',
  GetUserInfoStart = '[AUth] Get User Info Start',
  GetUserInfoSuccess = '[AUth] Get User Info Success',
  GetUserInfoFailure = '[AUth] Get User Info Failure',
  Logout = '[Auth] Logout Start',
  ChangePasswordStart = '[AUth] Change Password Start',
  ChangePasswordSuccess = '[AUth] Change Password Success',
  ChangePasswordFailure = '[AUth] Change Password Failure',
  ClearLocalStorage = '[Auth] Clear Local Storage',
  HandleAuthentication = '[Auth] Handle Authentication',
  HandleAuthenticationError = '[Auth] Handle Authentication Error',
  RenewSessionStart = '[Auth] Renew Session Start',
  RenewSessionSuccess = '[Auth] Renew Session Success',
  RenewSessionFailure = '[Auth] Renew Session Failure',
  ScheduleSessionRenewal = '[Auth] Schedule Session Renewal'
}

export class CheckAuthenticationStatus implements Action {
  readonly type = AuthActionTypes.CheckAuthenticationStatus;
}

export class UserIsAuthenticated implements Action {
  readonly type = AuthActionTypes.UserIsAuthenticated;

  constructor(public payload: { auth: Authentication }) {}
}

export class UserIsNotAuthenticated implements Action {
  readonly type = AuthActionTypes.UserIsNotAuthenticated;
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: { redirectUrl: string; options: auth0.AuthorizeOptions }) {}
}

export class GetUserInfoStart implements Action {
  readonly type = AuthActionTypes.GetUserInfoStart;
}

export class GetUserInfoSuccess implements Action {
  readonly type = AuthActionTypes.GetUserInfoSuccess;

  constructor(public payload: { userInfo: auth0.Auth0UserProfile }) {}
}

export class GetUserInfoFailure implements Action {
  readonly type = AuthActionTypes.GetUserInfoFailure;

  constructor(public payload: { error: any }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class ChangePasswordStart implements Action {
  readonly type = AuthActionTypes.ChangePasswordStart;

  constructor(public payload: { options: auth0.ChangePasswordOptions }) {}
}

export class ChangePasswordSuccess implements Action {
  readonly type = AuthActionTypes.ChangePasswordSuccess;
}

export class ChangePasswordFailure implements Action {
  readonly type = AuthActionTypes.ChangePasswordFailure;

  constructor(public payload: { error: any }) {}
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

export class RenewSessionStart implements Action {
  readonly type = AuthActionTypes.RenewSessionStart;
}

export class RenewSessionSuccess implements Action {
  readonly type = AuthActionTypes.RenewSessionSuccess;
}

export class RenewSessionFailure implements Action {
  readonly type = AuthActionTypes.RenewSessionFailure;

  constructor(public payload: { error: any }) {}
}

export class ScheduleSessionRenewal implements Action {
  readonly type = AuthActionTypes.ScheduleSessionRenewal;
}

export type AuthActions =
  | CheckAuthenticationStatus
  | Login
  | GetUserInfoStart
  | GetUserInfoSuccess
  | GetUserInfoFailure
  | Logout
  | ChangePasswordStart
  | ChangePasswordSuccess
  | ChangePasswordFailure
  | ClearLocalStorage
  | HandleAuthentication
  | HandleAuthenticationError
  | RenewSessionStart
  | RenewSessionSuccess
  | RenewSessionFailure
  | ScheduleSessionRenewal;
