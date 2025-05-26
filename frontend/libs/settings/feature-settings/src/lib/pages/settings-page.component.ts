import {Component, DestroyRef, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThemeSwitcherComponent} from "@frontend/theme";
import {AuthFacade} from "@frontend/auth-data-access";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Actions} from "@ngrx/effects";
import * as AuthActions from "@frontend/auth-data-access";
import {Router} from "@angular/router";
@Component({
  selector: "lib-settings-page",
  templateUrl: "./settings-page.component.html",
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
})
export class SettingsPageComponent implements OnInit {
  public isAuthenticated = false;
  constructor(
    private authFacade: AuthFacade,
    private actions: Actions,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authFacade.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  async logout() {
    await this.watchActionsChange();
    this.authFacade.logout();
  }

  async login() {
    this.router.navigate(["/auth"]);
  }

  private async watchActionsChange(): Promise<void> {
    this.actions
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => {
        if (action.type === AuthActions.ActionTypes.Logout) {
          this.router.navigate(["/"]);
        }
      });
  }
}
