import {NgModule} from "@angular/core";
import {AuthPageComponent} from "./pages/auth-page.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthDataAccessModule} from "@frontend/auth-data-access";
import {LoginPageComponent} from "./pages/login-page.component";
import {SignUpPageComponent} from "./pages/sign-up.page.component";

const routes: Routes = [
  {
    path: "",
    component: AuthPageComponent,
    children: [
      {
        path: "login",
        component: LoginPageComponent,
      },
      {
        path: "sign-up",
        component: SignUpPageComponent,
      },
      {
        path: "**",
        redirectTo: "login",
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), AuthDataAccessModule],
})
export class AuthModule {}
