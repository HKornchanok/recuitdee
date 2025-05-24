import {createReducer, on} from "@ngrx/store";
import {Character} from "../../interfaces/character.interface";
import * as SearchActions from "./search.actions";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export const searchFeatureKey = "search";

export interface SearchState extends EntityState<Character> {
  loading: boolean;
  pagination: {
    count: number;
    pages: number;
    next: string;
    prev: string;
    filter: {
      searchQuery: string;
      gender: string;
      status: string;
    };
  };
}

export const characterAdapter = createEntityAdapter<Character>({
  selectId: (character: Character) => character.id,
  sortComparer: (a: Character, b: Character) => a.id - b.id,
});

export const initialState: SearchState = characterAdapter.getInitialState({
  loading: false,
  pagination: {
    count: 0,
    pages: 0,
    next: "",
    prev: "",
    filter: {
      searchQuery: "",
      gender: "",
      status: "",
    },
  },
});

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.loadCharacters, (state) => ({...state, loading: true})),
  on(SearchActions.loadCharactersSuccess, (state, {results, pagination}) => ({
    ...characterAdapter.addMany(results, state),
    loading: false,
    pagination: {
      ...pagination,
      filter: {
        ...pagination.filter,
        searchQuery: pagination.filter.searchQuery || "",
        gender: pagination.filter.gender || "",
        status: pagination.filter.status || "",
      },
    },
  })),
  on(SearchActions.loadCharactersFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(SearchActions.updateFilter, (state, {filter}) => ({
    ...characterAdapter.removeAll(state),
    loading: false,
    pagination: {
      ...state.pagination,
      count: 0,
      pages: 0,
      next: "",
      prev: "",
      filter: {
        searchQuery: filter.searchQuery || "",
        gender: filter.gender || "",
        status: filter.status || "",
      },
    },
  }))
);
