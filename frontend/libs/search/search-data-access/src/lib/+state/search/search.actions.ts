import {createAction, props} from "@ngrx/store";
import {
  Character,
  CharacterFilter,
  CharacterPagination,
} from "../../interfaces/character.interface";

export const loadCharacters = createAction(
  "[Search] Load Characters",
  props<{pagination: CharacterPagination; refresh: boolean}>()
);

export const loadCharactersSuccess = createAction(
  "[Search] Load Characters Success",
  props<{results: Character[]; pagination: CharacterPagination}>()
);

export const loadCharactersFailure = createAction(
  "[Search] Load Characters Failure",
  props<{error: string}>()
);

export const updateFilter = createAction(
  "[Search] Update Filter",
  props<{filter: CharacterFilter}>()
);
