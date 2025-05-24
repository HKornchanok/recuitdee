import {Store} from "@ngrx/store";
import {
  Character,
  CharacterFilter,
  CharacterPagination,
} from "../../interfaces/character.interface";
import {loadCharacters, updateFilter} from "./search.actions";
import {Injectable} from "@angular/core";
import {selectSearchResults, selectSearchState} from "./search.selectors";
import {Observable} from "rxjs";
import {SearchState} from "./search.reducer";

@Injectable({
  providedIn: "root",
})
export class SearchFacade {
  constructor(private readonly store: Store<SearchState>) {}

  public loadCharacters(pagination: CharacterPagination, refresh = false) {
    this.store.dispatch(loadCharacters({pagination, refresh}));
  }

  public get results$(): Observable<Character[]> {
    return this.store.select(selectSearchResults);
  }

  public get state$(): Observable<SearchState> {
    return this.store.select(selectSearchState);
  }

  public updateFilter(filter: CharacterFilter) {
    this.store.dispatch(updateFilter({filter}));
  }
}
