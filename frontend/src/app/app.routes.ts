import {Routes} from "@angular/router";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {InsidePageComponent} from "./pages/inside-page/inside-page.component";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./pages/auth-page/components/login/login.component";
import {RegisterComponent} from "./pages/auth-page/components/register/register.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
  },
  {
    path: "inside",
    canActivate: [AuthGuard],
    component: InsidePageComponent,
  },
  {
    path: "auth",
    component: AuthPageComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "**",
        redirectTo: "login",
        pathMatch: "full",
      },
    ],
  },
];
