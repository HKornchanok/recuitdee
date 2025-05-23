import { createAction, props } from '@ngrx/store';

export const initTheme = createAction('[Theme] Init Theme');
export const toggleTheme = createAction('[Theme] Toggle Theme');
export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ isDarkMode: boolean }>()
); 