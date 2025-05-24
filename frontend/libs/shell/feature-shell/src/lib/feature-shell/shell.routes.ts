import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {provideState} from "@ngrx/store";
import {searchFeatureKey, searchReducer} from "@frontend/search-data-access";
import {authFeatureKey, authReducer} from "@frontend/auth-data-access";
import {provideEffects} from "@ngrx/effects";
import {SearchEffects} from "@frontend/search-data-access";
import {AuthEffects} from "@frontend/auth-data-access";

const routes: Routes = [
  {
    path: "",
    providers: [
      provideState(searchFeatureKey, searchReducer),
      provideState(authFeatureKey, authReducer),
      provideEffects([SearchEffects, AuthEffects]),
    ],
    loadChildren: () => import("@frontend/tabs").then((m) => m.TabsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutesModule {}
