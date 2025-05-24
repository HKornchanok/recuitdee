import {Store} from "@ngrx/store";
import {FavoriteState} from "../../interfaces/favorite.interface";
import {addFavorite, removeFavorite} from "./favorite.actions";
import {Injectable} from "@angular/core";
import {Character} from "../../interfaces/character.interface";
import {Observable} from "rxjs";
import {selectFavorites} from "./favorite.selectors";

@Injectable({
  providedIn: "root",
})
export class FavoriteFacade {
  constructor(private readonly store: Store<FavoriteState>) {}

  public addFavorite(character: Character) {
    this.store.dispatch(addFavorite({character}));
  }

  public removeFavorite(character: Character) {
    this.store.dispatch(removeFavorite({character}));
  }

  public get favorites$(): Observable<Character[]> {
    return this.store.select(selectFavorites);
  }
}
