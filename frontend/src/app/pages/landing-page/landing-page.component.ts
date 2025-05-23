import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ThemeSwitcherComponent} from "@frontend/theme";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: "./landing-page.component.html",
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToSecondPage() {
    this.router.navigate(["/second-page"]);
  }
}
