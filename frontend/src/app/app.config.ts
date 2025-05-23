import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app.routes";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {authFeature} from "@frontend/auth-data-access";
import {themeFeature} from "@frontend/theme";
import {ThemeEffects} from "@frontend/theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [themeFeature.name]: themeFeature.reducer,
    }),
    provideEffects([ThemeEffects]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
