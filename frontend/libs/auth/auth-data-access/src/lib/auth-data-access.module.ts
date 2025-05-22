import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {provideState} from "@ngrx/store";
import {authFeature} from "./+state/auth.reducer";
import {AuthFacade} from "./+state/auth.facade";

@NgModule({
  imports: [CommonModule],
  providers: [provideState("auth", authFeature.reducer)],
  exports: [],
})
export class AuthDataAccessModule {}
