import { AuthActions, AuthActionTypes } from "./auth.actions";
import { Auth } from "./auth.model";

export interface State extends Auth {}

export const initialState: State = {
  expiresAt: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.HandleAuthentication: {
      return {
        ...state,
        ...action.payload.auth
      };
    }

    default:
      return state;
  }
}
