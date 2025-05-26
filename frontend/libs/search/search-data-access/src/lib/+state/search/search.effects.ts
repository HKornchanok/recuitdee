import {inject} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CharacterService} from "../../providers/character.service";
import * as SearchActions from "./search.actions";
import {catchError, from, map, of, switchMap} from "rxjs";

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

  loadCharacterById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadCharacterById),
      switchMap(({id}) =>
        from(this.characterService.getCharacterById(id)).pipe(
          map((character) =>
            SearchActions.loadCharacterByIdSuccess({character})
          ),
          catchError((error: any) =>
            of(SearchActions.loadCharacterByIdFailure({error: error.message}))
          )
        )
      )
    )
  );

  loadDetailsByCharacterId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadDetailsByCharacterId),
      switchMap(({character}) =>
        from(this.characterService.getDetailsByCharacter(character))
      ),
      map((character) =>
        SearchActions.loadDetailsByCharacterIdSuccess({character})
      ),
      catchError((error: any) =>
        of(
          SearchActions.loadDetailsByCharacterIdFailure({error: error.message})
        )
      )
    )
  );
}
