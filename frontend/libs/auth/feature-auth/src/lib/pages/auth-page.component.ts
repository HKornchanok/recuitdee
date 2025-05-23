import {Component} from "@angular/core";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-auth-page",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: "./auth-page.component.html",
})
export class AuthPageComponent {
  constructor(
    private router: Router,
  ) {}

  public onLoginClick() {
    this.router.navigate(["second-page/auth"]);
  }

  public onRegisterClick() {
    this.router.navigate(["second-page/auth/sign-up"]);
  }
}
