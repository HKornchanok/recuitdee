import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {TabPageComponent} from "./pages/tab.page";
import {AuthGuard} from "@frontend/auth-data-access";

const routes: Routes = [
  {
    path: "",
    component: TabPageComponent,
    children: [
      {
        path: "search",
        loadChildren: () =>
          import("@frontend/feature-search").then((m) => m.FeatureSearchModule),
      },
      {
        path: "favorite",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("@frontend/feature-favorite").then(
            (m) => m.FeatureFavoriteModule
          ),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("@frontend/feature-settings").then(
            (m) => m.FeatureSettingsModule
          ),
      },
      {
        path: "**",
        redirectTo: "search",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class TabsModule {}
