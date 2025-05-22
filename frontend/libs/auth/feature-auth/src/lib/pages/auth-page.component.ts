import {Component} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-auth-page",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    auth page
    <router-outlet></router-outlet>
  `,
})
export class AuthPageComponent {
  constructor(private router: Router) {}
}
