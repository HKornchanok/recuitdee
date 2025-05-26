import {Store} from "@ngrx/store";
import {
  Character,
  CharacterFilter,
  CharacterPagination,
} from "../../interfaces/character.interface";
import * as SearchActions from "./search.actions";
import {Injectable} from "@angular/core";
import {
  selectCharacterById,
  selectSearchResults,
  selectSearchState,
} from "./search.selectors";
import {Observable} from "rxjs";
import {SearchState} from "./search.reducer";

@Injectable({
  providedIn: "root",
})
export class SearchFacade {
  constructor(private readonly store: Store<SearchState>) {}

  public loadCharacters(
    pagination: CharacterPagination,
    refresh = false
  ): void {
    this.store.dispatch(SearchActions.loadCharacters({pagination, refresh}));
  }

  public get results$(): Observable<Character[]> {
    return this.store.select(selectSearchResults);
  }

  public get state$(): Observable<SearchState> {
    return this.store.select(selectSearchState);
  }

  public updateFilter(filter: CharacterFilter): void {
    this.store.dispatch(SearchActions.updateFilter({filter}));
  }

  public getCharacterById(id: number): Observable<Character | undefined> {
    return this.store.select(selectCharacterById(id));
  }

  public loadCharacterById(id: number): void {
    this.store.dispatch(SearchActions.loadCharacterById({id}));
  }

  public loadDetailsByCharacterId(id: number, character: Character): void {
    this.store.dispatch(
      SearchActions.loadDetailsByCharacterId({id, character})
    );
  }
}
