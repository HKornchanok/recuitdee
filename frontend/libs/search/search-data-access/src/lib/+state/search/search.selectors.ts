import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  searchFeatureKey,
  characterAdapter,
  SearchState,
} from "./search.reducer";

export const selectSearchState =
  createFeatureSelector<SearchState>(searchFeatureKey);

export const {
  selectAll: selectAllCharacters,
  selectEntities: selectCharacterEntities,
  selectIds: selectCharacterIds,
  selectTotal: selectCharacterTotal,
} = characterAdapter.getSelectors(selectSearchState);

export const selectSearchResults = selectAllCharacters;
export const selectSearchLoading = (state: SearchState) => state.loading;
export const selectSearchPagination = (state: SearchState) => state.pagination;
export const selectCharacterById = (id: number) =>
  createSelector(selectCharacterEntities, (entities) => entities[id]);

export const selectSearchError = (state: SearchState) => state.error;
