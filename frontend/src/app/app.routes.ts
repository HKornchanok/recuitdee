import {Routes} from "@angular/router";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";

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
    path: "**",
    redirectTo: "",
  },
];
