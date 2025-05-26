import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SearchPageComponent} from "./pages/search-page.component";
import {SearchDataAccessModule} from "@frontend/search-data-access";
import {CharacterDetailPageComponent} from "./pages/character-detail-page.component";
import {provideState} from "@ngrx/store";
import {
  favoriteFeatureKey,
  favoriteReducer,
} from "@frontend/favorite-data-access";

const routes: Routes = [
  {
    path: "",
    component: SearchPageComponent,
  },
  {
    path: ":id",
    component: CharacterDetailPageComponent,
    providers: [provideState(favoriteFeatureKey, favoriteReducer)],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchDataAccessModule,
  ],
  exports: [],
})
export class FeatureSearchModule {}
