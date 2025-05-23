import {createReducer, on} from "@ngrx/store";
import {createFeature} from "@ngrx/store";
import * as AuthActions from "./auth.actions";
import {initialAuthState} from "./auth.state";

export const authFeature = createFeature({
  name: "auth",
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.loginSuccess, (state, {user}) => ({
      ...state,
      isAuthenticated: true,
      user,
    })),
    on(AuthActions.logout, () => ({
      ...initialAuthState,
    }))
  ),
});
