import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import * as ThemeActions from './theme.actions';
import { selectIsDarkMode } from './theme.selectors';
import { ThemeService } from '../providers/theme.service';

@Injectable()
export class ThemeEffects {

    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly themeService = inject(ThemeService);

  initTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.initTheme),
      map(() => {
        const isDarkMode = this.themeService.getStoredTheme();
        this.themeService.setTheme(isDarkMode);
        return ThemeActions.setTheme({ isDarkMode });
      })
    )
  );

  updateTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.toggleTheme),
      withLatestFrom(this.store.select(selectIsDarkMode)),
      map(([, isDarkMode]) => {
        const newIsDarkMode = this.themeService.toggleTheme(isDarkMode);
        return ThemeActions.setTheme({ isDarkMode: newIsDarkMode });  
      })
    )
  );


} 