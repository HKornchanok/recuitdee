import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthFacade } from "@frontend/auth-data-access";
@Component({
  selector: "lib-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignUpPageComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.authFacade.signUp(this.signUpForm.value);
    }
  }
}
