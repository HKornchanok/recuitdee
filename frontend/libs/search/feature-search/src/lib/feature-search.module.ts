import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SearchPageComponent} from "./pages/search-page.component";
import {SearchDataAccessModule} from "@frontend/search-data-access";

const routes: Routes = [
  {
    path: "",
    component: SearchPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchDataAccessModule,
  ],
  exports: [RouterModule],
})
export class FeatureSearchModule {}
