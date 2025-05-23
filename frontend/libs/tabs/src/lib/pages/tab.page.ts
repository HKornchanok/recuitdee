import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import { AuthFacade } from "@frontend/auth-data-access";
import { User } from "@frontend/auth-data-access";
import { CommonModule } from '@angular/common';
import { ThemeFacade } from "@frontend/theme";

@Component({
  selector: "lib-tab-page",
  templateUrl: "./tab.page.html",
  styleUrls: ["./tab.page.scss"],
  standalone: true,
  imports: [RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabPageComponent {
  user: User | null = null;
  isCollapsed = false;
  isSidebarCollapsed = false;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly themeFacade: ThemeFacade,      
  ) {
    this.authFacade.user$.subscribe((user) => this.user = user);
    this.themeFacade.initTheme();
    
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
