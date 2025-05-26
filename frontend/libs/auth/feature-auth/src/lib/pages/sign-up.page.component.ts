import {CommonModule} from "@angular/common";
import {Component, DestroyRef} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthFacade} from "@frontend/auth-data-access";
import * as AuthActions from "@frontend/auth-data-access";
import {Actions} from "@ngrx/effects";
@Component({
  selector: "lib-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignUpPageComponent {
  public signUpForm: FormGroup;
  private returnUrl = "/";
  public errorMessage: string | null = null;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authFacade: AuthFacade,
    private readonly route: ActivatedRoute,
    private readonly destroyRef: DestroyRef,
    private readonly actions: Actions,
    private readonly router: Router
  ) {
    this.signUpForm = this.fb.group({
      username: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Record<string, string>) => {
        this.returnUrl = params["returnUrl"] || "/";
      });
  }

  public async onSubmit(): Promise<void> {
    if (this.signUpForm.valid) {
      this.errorMessage = null;
      await this.watchActionsChange();
      this.authFacade.signUp(this.signUpForm.value);
    }
  }

  private async watchActionsChange(): Promise<void> {
    this.actions
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        if (action.type === AuthActions.ActionTypes.SignUpSuccess) {
          this.router.navigate([this.returnUrl]);
        }
        if (action.type === AuthActions.ActionTypes.SignUpFailure) {
          this.errorMessage = "Could not create account. Please try again.";
        }
      });
  }
}
