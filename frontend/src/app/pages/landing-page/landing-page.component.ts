import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ThemeSwitcherComponent} from "@frontend/theme";
import { AuthFacade, User } from "@frontend/auth-data-access";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: "./landing-page.component.html",
})
export class LandingPageComponent {
  user: User | null = null;
  constructor(private router: Router, private authFacade: AuthFacade) {
    this.authFacade.user$.subscribe((user) => this.user = user);
  }

  navigateToSecondPage() {
    this.router.navigate(["/second-page"]);
  }
}
