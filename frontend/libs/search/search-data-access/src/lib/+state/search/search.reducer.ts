import {createReducer, on} from "@ngrx/store";
import {Character} from "../../interfaces/character.interface";
import * as SearchActions from "./search.actions";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import * as AuthActions from "@frontend/auth-data-access";

export const searchFeatureKey = "search";

export interface SearchState extends EntityState<Character> {
  loading: boolean;
  error: string | null;
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
  error: null,
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
  on(SearchActions.loadCharacters, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SearchActions.loadCharactersSuccess, (state, {results, pagination}) => ({
    ...characterAdapter.addMany(results, state),
    loading: false,
    error: null,
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
  on(SearchActions.loadCharactersFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(SearchActions.updateFilter, (state, {filter}) => ({
    ...characterAdapter.removeAll(state),
    loading: false,
    error: null,
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
  })),
  on(SearchActions.loadCharacterById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SearchActions.loadCharacterByIdSuccess, (state, {character}) => ({
    ...characterAdapter.addOne(character, state),
    loading: false,
    error: null,
  })),
  on(SearchActions.loadCharacterByIdFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(SearchActions.loadDetailsByCharacterId, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SearchActions.loadDetailsByCharacterIdSuccess, (state, {character}) => ({
    ...characterAdapter.upsertOne(character, state),
    loading: false,
    error: null,
  })),
  on(SearchActions.loadDetailsByCharacterIdFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(AuthActions.logout, () => ({
    ...initialState,
  }))
);
