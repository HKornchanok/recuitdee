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
        path: "",
        redirectTo: "",
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
