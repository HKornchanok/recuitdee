import {createAction, props} from "@ngrx/store";
import {Character} from "../../interfaces/character.interface";

export const addFavorite = createAction(
  "[Favorite] Add Favorite",
  props<{character: Character}>()
);

export const removeFavorite = createAction(
  "[Favorite] Remove Favorite",
  props<{character: Character}>()
);
