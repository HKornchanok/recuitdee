import {Character} from "./character.interface";
import {EntityState} from "@ngrx/entity";

export interface FavoriteState extends EntityState<Character> {
  loading: boolean;
}

export const initialState: FavoriteState = {
  ids: [],
  entities: {},
  loading: false,
};
  