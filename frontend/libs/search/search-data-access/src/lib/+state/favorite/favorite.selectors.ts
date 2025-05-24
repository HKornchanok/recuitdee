import {createFeatureSelector} from "@ngrx/store";
import {FavoriteState} from "../../interfaces/favorite.interface";
import {favoriteAdapter, favoriteFeatureKey} from "./favorite.reducer";

export const selectFavoriteState =
  createFeatureSelector<FavoriteState>(favoriteFeatureKey);

export const {
  selectAll: selectAllCharacters,
  selectEntities: selectCharacterEntities,
  selectIds: selectCharacterIds,
  selectTotal: selectCharacterTotal,
} = favoriteAdapter.getSelectors(selectFavoriteState);

export const selectFavorites = selectAllCharacters;
