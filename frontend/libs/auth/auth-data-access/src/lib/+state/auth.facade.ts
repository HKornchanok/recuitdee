import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {authFeature} from "./auth.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthFacade {
  constructor(private readonly store: Store) {}

  public get isAuthenticated$(): Observable<boolean> {
    return this.store.select(authFeature.selectIsAuthenticated);
  }
}
