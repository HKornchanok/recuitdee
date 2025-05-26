import {Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy} from "@angular/core";
import {
  Router,
  ActivatedRoute,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: "lib-auth-page",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./auth-page.component.html",
})
export class AuthPageComponent implements OnDestroy {
  public returnUrl = "/";
  public queryParams: Record<string, string> = {};
  private destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Record<string, string>) => {
        this.returnUrl = params["returnUrl"] || "/";
        this.queryParams = params;
      });
  }

  public goBack(): void {
    this.router.navigate([this.returnUrl]);
  }

  public onLoginClick(): void {
    this.router.navigate(["/auth"]);
  }

  public onRegisterClick(): void {
    this.router.navigate(["/auth/sign-up"]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
