import {Character} from "@frontend/search-data-access";
import {createEntityAdapter} from "@ngrx/entity";

export const favoriteAdapter = createEntityAdapter<Character>({
  selectId: (character: Character) => character.id,
  sortComparer: (a: Character, b: Character) => a.id - b.id,
});

export const initialState = favoriteAdapter.getInitialState();
