import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FavoritePageComponent} from "./pages/favorite-page.component";

const routes: Routes = [
  {
    path: "",
    component: FavoritePageComponent,
  },
];      

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureFavoriteModule {}