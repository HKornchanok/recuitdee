import {createAction, props} from "@ngrx/store";
import {
  Character,
  CharacterFilter,
  CharacterPagination,
} from "../../interfaces/character.interface";

export enum SearchActionTypes {
  LOAD_CHARACTERS = "[Search] Load Characters",
  LOAD_CHARACTERS_SUCCESS = "[Search] Load Characters Success",
  LOAD_CHARACTERS_FAILURE = "[Search] Load Characters Failure",
  UPDATE_FILTER = "[Search] Update Filter",
  LOAD_CHARACTER_BY_ID = "[Search] Load Character by ID",
  LOAD_CHARACTER_BY_ID_SUCCESS = "[Search] Load Character by ID Success",
  LOAD_CHARACTER_BY_ID_FAILURE = "[Search] Load Character by ID Failure",
  LOAD_DETAILS_BY_CHARACTER_ID = "[Search] Load Details by Character ID",
  LOAD_DETAILS_BY_CHARACTER_ID_SUCCESS = "[Search] Load Details by Character ID Success",
  LOAD_DETAILS_BY_CHARACTER_ID_FAILURE = "[Search] Load Details by Character ID Failure",
}

export const loadCharacters = createAction(
  SearchActionTypes.LOAD_CHARACTERS,
  props<{pagination: CharacterPagination; refresh: boolean}>()
);

export const loadCharactersSuccess = createAction(
  SearchActionTypes.LOAD_CHARACTERS_SUCCESS,
  props<{results: Character[]; pagination: CharacterPagination}>()
);

export const loadCharactersFailure = createAction(
  SearchActionTypes.LOAD_CHARACTERS_FAILURE,
  props<{error: string}>()
);

export const updateFilter = createAction(
  SearchActionTypes.UPDATE_FILTER,
  props<{filter: CharacterFilter}>()
);

export const loadCharacterById = createAction(
  SearchActionTypes.LOAD_CHARACTER_BY_ID,
  props<{id: number}>()
);

export const loadCharacterByIdSuccess = createAction(
  SearchActionTypes.LOAD_CHARACTER_BY_ID_SUCCESS,
  props<{character: Character}>()
);

export const loadCharacterByIdFailure = createAction(
  SearchActionTypes.LOAD_CHARACTER_BY_ID_FAILURE,
  props<{error: string}>()
);

export const loadDetailsByCharacterId = createAction(
  SearchActionTypes.LOAD_DETAILS_BY_CHARACTER_ID,
  props<{id: number; character: Character}>()
);

export const loadDetailsByCharacterIdSuccess = createAction(
  SearchActionTypes.LOAD_DETAILS_BY_CHARACTER_ID_SUCCESS,
  props<{character: Character}>()
);

export const loadDetailsByCharacterIdFailure = createAction(
  SearchActionTypes.LOAD_DETAILS_BY_CHARACTER_ID_FAILURE,
  props<{error: string}>()
);
