import {createAction, props} from "@ngrx/store";
import {Character} from "@frontend/search-data-access";

export enum FavoriteActions {
  ADD_FAVORITE = "[Favorite] Add Favorite",
  REMOVE_FAVORITE = "[Favorite] Remove Favorite",
  GET_FAVORITES = "[Favorite] Get Favorites",
}

export const addFavorite = createAction(
  FavoriteActions.ADD_FAVORITE,
  props<{character: Character}>()
);
export const removeFavorite = createAction(
  FavoriteActions.REMOVE_FAVORITE,
  props<{character: Character}>()
);
export const getFavorites = createAction(FavoriteActions.GET_FAVORITES);
