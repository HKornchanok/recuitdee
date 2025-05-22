import {createReducer, on, createAction, props} from "@ngrx/store";
import {createFeature, createSelector} from "@ngrx/store";

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Auth Actions
export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{user: any}>()
);

export const logout = createAction("[Auth] Logout");

export const authFeature = createFeature({
  name: "auth",
  reducer: createReducer(
    initialState,
    on(loginSuccess, (state, {user}) => ({
      ...state,
      isAuthenticated: true,
      user,
    })),
    on(logout, () => ({
      ...initialState,
    }))
  ),
  extraSelectors: ({selectAuthState}) => ({
    selectIsAuthenticated: createSelector(
      selectAuthState,
      (state: AuthState) => state.isAuthenticated
    ),
  }),
});
