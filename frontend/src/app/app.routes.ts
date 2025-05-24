import {Routes} from "@angular/router";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {
  AuthEffects,
  authFeatureKey,
  authReducer,
} from "@frontend/auth-data-access";
export const appRoutes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
  },
  {
    path: "second-page",
    loadChildren: () =>
      import("@frontend/feature-shell").then((m) => m.ShellModule),
  },
  {
    path: "auth",
    providers: [
      provideState(authFeatureKey, authReducer),
      provideEffects(AuthEffects),
    ],
    loadChildren: () =>
      import("@frontend/feature-auth").then((m) => m.AuthModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
