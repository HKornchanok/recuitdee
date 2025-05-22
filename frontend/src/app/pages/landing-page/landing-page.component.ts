import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Welcome to Landing Page</h1>
      <button (click)="navigateToSecondPage()">Go to Second Page</button>
    </div>
  `,
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  navigateToSecondPage() {
    this.router.navigate(["/second-page"]);
  }
}
