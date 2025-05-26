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
    private readonly authFacade: AuthFacade,
    private readonly actions: Actions,
    private readonly destroyRef: DestroyRef,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.authFacade.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  public async logout(): Promise<void> {
    await this.watchActionsChange();
    this.authFacade.logout();
  }

  public async login(): Promise<void> {
    this.router.navigate(["/auth"], {
      queryParams: {
        returnUrl: "/second-page/settings",
      },
    });
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
