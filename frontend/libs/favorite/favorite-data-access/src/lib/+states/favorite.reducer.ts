import {createReducer, on} from "@ngrx/store";
import {initialState, favoriteAdapter} from "./favorite.interface";
import {addFavorite, removeFavorite, getFavorites} from "./favorite.actions";
import * as AuthActions from "@frontend/auth-data-access";

export const favoriteFeatureKey = "favorite";

export const favoriteReducer = createReducer(
  initialState,
  on(addFavorite, (state, {character}) =>
    favoriteAdapter.addOne(character, state)
  ),
  on(removeFavorite, (state, {character}) =>
    favoriteAdapter.removeOne(character.id, state)
  ),
  on(getFavorites, (state) => state),
  on(AuthActions.logout, () => ({
    ...initialState,
  }))
);
