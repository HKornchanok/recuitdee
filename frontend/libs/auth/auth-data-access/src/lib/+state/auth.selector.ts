import {createFeatureSelector, createSelector} from "@ngrx/store";
import {authFeatureKey} from "./auth.reducer";
import {AuthState} from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectUserFullName = createSelector(selectUser, (user) =>
  user ? `${user.firstName} ${user.lastName}` : ""
);

export const selectUsername = createSelector(
  selectUser,
  (user) => user?.username
);
