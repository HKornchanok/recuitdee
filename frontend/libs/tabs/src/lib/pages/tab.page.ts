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
  public user: User | null = null;
  public isCollapsed = false;
  public isSidebarCollapsed = false;

  constructor(private readonly authFacade: AuthFacade) {
    this.authFacade.user$.subscribe((user) => (this.user = user));
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
