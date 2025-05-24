import {createReducer, on} from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import {initialAuthState} from "./auth.state";

export const authFeatureKey = "auth";
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, {user, token}) => ({
    ...state,
    isAuthenticated: true,
    user: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token: token,
  })),
  on(AuthActions.signUpSuccess, (state, {user, token}) => ({
    ...state,
    isAuthenticated: true,
    user: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token: token,
  })),
  on(AuthActions.logout, () => ({
    ...initialAuthState,
  }))
);
