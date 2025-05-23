import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as authActions from "./auth.actions";
import { Credentials, User } from "./auth.state";
import { selectIsAuthenticated, selectUser } from "./auth.selector";
@Injectable({
  providedIn: "root",
})
export class AuthFacade {
  constructor(private readonly store: Store) {}

  public init(): void {
    this.store.dispatch(authActions.init());
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }

  public get user$(): Observable<User | null> {
    return this.store.select(selectUser);
  }   

  public login(credentials: Credentials): void {
    this.store.dispatch(authActions.login(credentials));
  }

  public logout(): void { 
    this.store.dispatch(authActions.logout());
  }

  public signUp(user: User): void {
    this.store.dispatch(authActions.signUp(user));
  }
}
