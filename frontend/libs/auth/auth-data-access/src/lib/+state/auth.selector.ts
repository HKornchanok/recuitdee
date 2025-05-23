import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const selectAuthState = authFeature.selectAuthState;

export const selectIsAuthenticated = authFeature.selectIsAuthenticated;

export const selectUser = authFeature.selectUser;

export const selectUserFullName = createSelector(
  selectUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

export const selectUsername = createSelector(
  selectUser,
  (user) => user?.username
);
