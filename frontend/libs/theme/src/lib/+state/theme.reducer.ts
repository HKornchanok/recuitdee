import {createReducer, on} from "@ngrx/store";
import {createFeature} from "@ngrx/store";
import * as ThemeActions from "./theme.actions";
import {initialThemeState} from "./theme.state";


export const themeFeature = createFeature({
  name: "theme",
  reducer: createReducer(
    initialThemeState,
    on(ThemeActions.initTheme, (state) => ({
      ...state,
      isDarkMode: state.isDarkMode
    })),
    on(ThemeActions.setTheme, (state, { isDarkMode }) => ({
      ...state,
      isDarkMode
    }))
  )
});
