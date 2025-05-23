import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";
import { AuthFacade } from "@frontend/auth-data-access";
import { User } from "@frontend/auth-data-access";

@Component({
  selector: "lib-tab-page",
  templateUrl: "./tab.page.html",
  styleUrls: ["./tab.page.scss"],
  standalone: true,
  imports: [RouterModule],
})
export class TabPageComponent {
  user: User | null = null;

  constructor(private authFacade: AuthFacade) {
    this.authFacade.user$.subscribe((user) => this.user = user);
  }
}
