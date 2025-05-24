import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {AuthFacade} from "./+state/auth.facade";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authFacade.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        // Store the current URL in router state before redirecting
        const currentUrl = this.router.url;
        return this.router.createUrlTree(["/auth"], {
          queryParams: {returnUrl: currentUrl !== "/" ? currentUrl : "/"},
        });
      })
    );
  }
}
