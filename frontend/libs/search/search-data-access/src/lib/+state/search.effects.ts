import {inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CharacterService} from "../providers/character.service";
import * as SearchActions from "./search.actions";
import {catchError, map, of, switchMap} from "rxjs";

export class SearchEffects {
  private readonly actions$ = inject(Actions);
  private readonly characterService = inject(CharacterService);

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadCharacters),
      switchMap(({pagination, refresh}) =>
        this.characterService.getCharacters(pagination, refresh)
      ),
      map(({results, pagination}) =>
        SearchActions.loadCharactersSuccess({results, pagination})
      ),
      catchError((error) => of(SearchActions.loadCharactersFailure({error})))
    )
  );
}
