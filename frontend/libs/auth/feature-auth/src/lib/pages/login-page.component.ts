import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthFacade } from "@frontend/auth-data-access";
@Component({
  selector: "lib-login-page",
  templateUrl: "./login-page.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
    }
  }
}
