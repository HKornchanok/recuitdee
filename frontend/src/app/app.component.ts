import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AuthFacade} from "@frontend/auth-data-access";
import {ThemeFacade} from "@frontend/theme";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  title = "frontend";

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly themeFacade: ThemeFacade
  ) {
    this.authFacade.init();
    this.themeFacade.initTheme();
  }
}
