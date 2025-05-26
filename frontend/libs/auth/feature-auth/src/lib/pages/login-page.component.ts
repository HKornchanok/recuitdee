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
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: "lib-login-page",
  templateUrl: "./login-page.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginPageComponent {
  public loginForm: FormGroup;
  public errorMessage: string | null = null;
  public returnUrl = "/";

  constructor(
    private readonly fb: FormBuilder,
    private readonly authFacade: AuthFacade,
    private readonly actions: Actions,
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Record<string, string>) => {
        this.returnUrl = params["returnUrl"] || "/";
      });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      await this.watchActionsChange();
      this.authFacade.login(this.loginForm.value);
    }
  }

  private async watchActionsChange(): Promise<void> {
    this.actions
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        if (action.type === AuthActions.ActionTypes.LoginSuccess) {
          this.router.navigate([this.returnUrl]);
        }
        if (action.type === AuthActions.ActionTypes.LoginFailure) {
          this.errorMessage = "Invalid username or password. Please try again.";
        }
      });
  }
}
