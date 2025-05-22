import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShellComponent} from "./shell.component";
import {AuthGuard} from "@frontend/auth-data-access";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () => import("@frontend/tabs").then((m) => m.TabsModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("@frontend/feature-auth").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutesModule {}
