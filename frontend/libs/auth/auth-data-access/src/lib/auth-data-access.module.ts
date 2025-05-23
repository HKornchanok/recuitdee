import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {provideState} from "@ngrx/store";
import {authFeature} from "./+state/auth.reducer";
import { AuthEffects } from "./+state/auth.effect";
import { provideEffects } from "@ngrx/effects";

@NgModule({
  imports: [CommonModule],
  providers: [provideState("auth", authFeature.reducer), provideEffects(AuthEffects)],
  exports: [],
})
export class AuthDataAccessModule {}
