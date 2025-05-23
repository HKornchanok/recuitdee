import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ThemeActions from './theme.actions';
import { selectIsDarkMode } from './theme.selectors';

@Injectable({
  providedIn: 'root'
})
export class ThemeFacade {
  isDarkMode$: Observable<boolean>;

  constructor(private store: Store) {
    this.isDarkMode$ = this.store.select(selectIsDarkMode);
  }

  toggleTheme(): void {
    this.store.dispatch(ThemeActions.toggleTheme());
  }

  setTheme(isDarkMode: boolean): void {
    this.store.dispatch(ThemeActions.setTheme({ isDarkMode }));
  }

  initTheme(): void {
    this.store.dispatch(ThemeActions.initTheme());
  }
}
