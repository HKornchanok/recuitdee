import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {from, of} from "rxjs";
import {map, mergeMap, catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import * as AuthActions from "./auth.actions";
import {AuthService} from "../providers/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  authService = inject(AuthService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.init),
      mergeMap(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          return of(AuthActions.logout());
        }
        return from(this.authService.verifyAndRefreshToken(token)).pipe(
          map(({user, token}) => {
            return AuthActions.loginSuccess({user, token});
          }),
          catchError(() => {
            localStorage.removeItem("token");
            return of(AuthActions.logout());
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((credentials) =>
        from(this.authService.login(credentials)).pipe(
          map(({user, token}) => AuthActions.loginSuccess({user, token})),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              error.status === 401
                ? "Authentication failed"
                : "An error occurred during login";
            return of(AuthActions.loginFailure({error: errorMessage}));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({token}) => {
          localStorage.setItem("token", token);
        })
      ),
    {dispatch: false}
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap((user) =>
        from(this.authService.signUp(user)).pipe(
          map(({user, token}) => AuthActions.signUpSuccess({user, token})),
          catchError((error: HttpErrorResponse) => {
            const errorMessage =
              error.status === 401
                ? "Authentication failed"
                : "An error occurred during sign up";
            return of(AuthActions.signUpFailure({error: errorMessage}));
          })
        )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(({token}) => {
          localStorage.setItem("token", token);
          this.router.navigate(["/second-page"]);
        })
      ),
    {dispatch: false}
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem("token");
          this.router.navigate(["/login"]);
        })
      ),
    {dispatch: false}
  );
}
