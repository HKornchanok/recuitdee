import {createSelector} from "@ngrx/store";
import {favoriteAdapter} from "./favorite.interface";
import {Character} from "@frontend/search-data-access";
import {EntityState} from "@ngrx/entity";

export const selectFavorites = (state: {
  [key: string]: EntityState<Character>;
}) => state["favorite"];

export const selectFavoriteState = createSelector(
  selectFavorites,
  (state) => state
);

export const selectFavoriteIds = createSelector(
  selectFavorites,
  favoriteAdapter.getSelectors().selectIds
);

export const selectFavoriteEntities = createSelector(
  selectFavorites,
  favoriteAdapter.getSelectors().selectEntities
);
