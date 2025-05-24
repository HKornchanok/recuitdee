import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthFacade} from "@frontend/auth-data-access";
import {User} from "@frontend/auth-data-access";
import {CommonModule} from "@angular/common";

@Component({
  selector: "lib-tab-page",
  templateUrl: "./tab.page.html",
  styleUrls: ["./tab.page.scss"],
  standalone: true,
  imports: [RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabPageComponent {
  user: User | null = null;
  isCollapsed = false;
  isSidebarCollapsed = false;

  constructor(private readonly authFacade: AuthFacade) {
    this.authFacade.user$.subscribe((user) => (this.user = user));
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
