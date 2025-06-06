import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SettingsPageComponent} from "./pages/settings-page.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureSettingsModule {}
