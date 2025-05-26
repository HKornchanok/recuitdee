import {Store} from "@ngrx/store";
import {addFavorite, removeFavorite, getFavorites} from "./favorite.actions";
import {Injectable} from "@angular/core";
import {Character} from "@frontend/search-data-access";
import {Observable} from "rxjs";
import {selectFavorites} from "./favorite.selectors";
import {favoriteAdapter} from "./favorite.interface";
import {map} from "rxjs/operators";
import {EntityState} from "@ngrx/entity";

interface FavoriteState {
  [key: string]: EntityState<Character>;
}

@Injectable({
  providedIn: "root",
})
export class FavoriteFacade {
  constructor(private readonly store: Store<FavoriteState>) {}

  public addFavorite(character: Character): void {
    this.store.dispatch(addFavorite({character}));
  }

  public removeFavorite(character: Character): void {
    this.store.dispatch(removeFavorite({character}));
  }

  public getFavorites(): void {
    this.store.dispatch(getFavorites());
  }

  public getFavorites$(): Observable<Character[]> {
    return this.store
      .select(selectFavorites)
      .pipe(map((state) => favoriteAdapter.getSelectors().selectAll(state)));
  }

  public getIsFavorite(characterId: number): Observable<boolean> {
    return this.store.select(selectFavorites).pipe(
      map((state) =>
        favoriteAdapter
          .getSelectors()
          .selectEntities(state)[characterId]
          ? true
          : false
      )
    );
  }
}
