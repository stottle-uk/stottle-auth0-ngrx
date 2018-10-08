import { AuthActions, AuthActionTypes } from './auth.actions';
import { Authentication } from './auth.model';

export interface State {
  auth: Authentication;
  error: auth0.Auth0Error;
}

export const initialState: State = {
  auth: null,
  error: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.ClearLocalStorage:
    case AuthActionTypes.Logout: {
      return initialState;
    }

    case AuthActionTypes.HandleAuthentication: {
      return {
        ...state,
        error: null,
        auth: action.payload.auth
      };
    }

    case AuthActionTypes.HandleAuthenticationError: {
      return {
        ...state,
        error: action.payload.error
      };
    }

    default:
      return state;
  }
}

export const getAuth = (state: State) => state.auth;
export const getError = (state: State) => state.error;
