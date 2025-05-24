import {createReducer, on} from "@ngrx/store";
import {initialState} from "../../interfaces/favorite.interface";
import {addFavorite, removeFavorite} from "./favorite.actions";
import {createEntityAdapter} from "@ngrx/entity";
import {Character} from "../../interfaces/character.interface";

export const favoriteFeatureKey = "favorite";

export const favoriteAdapter = createEntityAdapter<Character>({
  selectId: (character: Character) => character.id,
  sortComparer: (a: Character, b: Character) => a.id - b.id,
});

export const favoriteReducer = createReducer(
  favoriteAdapter.getInitialState(initialState),
  on(addFavorite, (state, {character}) =>
    favoriteAdapter.addOne(character, state)
  ),
  on(removeFavorite, (state, {character}) =>
    favoriteAdapter.removeOne(character.id, state)
  )
);
