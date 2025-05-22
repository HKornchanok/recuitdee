import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthFacade} from "./+state/auth.facade";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        console.log(
          "redirecting to auth",
          this.router.createUrlTree(["/auth"])
        );
        return this.router.createUrlTree(["second-page/auth"]);
      })
    );
  }
}
