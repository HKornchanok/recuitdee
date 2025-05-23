import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import { AuthFacade } from "@frontend/auth-data-access";  
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  title = "frontend";

  constructor(private readonly authFacade: AuthFacade) {
    this.authFacade.init();
  }
}
