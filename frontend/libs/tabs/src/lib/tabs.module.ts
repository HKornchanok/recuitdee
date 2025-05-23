import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {TabPageComponent} from "./pages/tab.page";

const routes: Routes = [
  {
    path: "",
    component: TabPageComponent,
    children: [
      {
        path: "search",
        loadChildren: () => import("@frontend/feature-search").then((m) => m.FeatureSearchModule), 
      },
      {
        path: "favorite",
        loadChildren: () => import("@frontend/feature-favorite").then((m) => m.FeatureFavoriteModule),
      },
      {
        path: "settings",
        loadChildren: () => import("@frontend/feature-settings").then((m) => m.FeatureSettingsModule),
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
