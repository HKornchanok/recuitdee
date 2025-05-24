import {Component, DestroyRef} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {AuthFacade} from "@frontend/auth-data-access";
import {Actions} from "@ngrx/effects";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import * as AuthActions from "@frontend/auth-data-access";
import {Router} from "@angular/router";
@Component({
  selector: "lib-login-page",
  templateUrl: "./login-page.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private actions: Actions,
    private destroyRef: DestroyRef,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      await this.watchActionsChange();
      this.authFacade.login(this.loginForm.value);
    }
  }

  private async watchActionsChange(): Promise<void> {
    this.actions
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        if (action.type === AuthActions.ActionTypes.LoginSuccess) {
          this.router.navigate(["/second-page"]);
        }
        if (action.type === AuthActions.ActionTypes.LoginFailure) {
          console.log("login failure");
        }
      });
  }
}
