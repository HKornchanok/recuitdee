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
import {APP_CONFIG} from "@frontend/core";
import {environment} from "../environments/environment";
import { provideHttpClient } from "@angular/common/http";
import { AuthEffects } from "@frontend/auth-data-access";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [themeFeature.name]: themeFeature.reducer,
    }),
    provideEffects([ThemeEffects, AuthEffects]),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
