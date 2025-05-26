import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FavoritePageComponent} from "./pages/favorite-page.component";
import {provideState} from "@ngrx/store";
import {
  favoriteFeatureKey,
  favoriteReducer,
} from "@frontend/favorite-data-access";

const routes: Routes = [
  {
    path: "",
    component: FavoritePageComponent,
    providers: [provideState(favoriteFeatureKey, favoriteReducer)],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureFavoriteModule {}
