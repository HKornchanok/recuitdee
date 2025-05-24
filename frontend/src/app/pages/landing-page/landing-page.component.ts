import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import { AuthFacade, User } from "@frontend/auth-data-access";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [CommonModule],
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
