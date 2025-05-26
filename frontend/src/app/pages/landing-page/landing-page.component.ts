import {Component, DestroyRef, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {ThemeSwitcherComponent} from "@frontend/theme";
import {AuthFacade, User} from "@frontend/auth-data-access";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
})
export class LandingPageComponent implements OnInit {
  public user: User | null = null;
  public charactersCount: number | null = null;
  public locationsCount: number | null = null;
  public episodesCount: number | null = null;
  constructor(
    private readonly router: Router,
    private readonly authFacade: AuthFacade,
    private readonly destroyRef: DestroyRef,
    private readonly http: HttpClient
  ) {}

  public async ngOnInit(): Promise<void> {
    this.authFacade.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => (this.user = user));

    this.charactersCount = await this.getCharactersCount();
    this.locationsCount = await this.getLocationsCount();
    this.episodesCount = await this.getEpisodesCount();
  }

  public navigateToSecondPage(): void {
    this.router.navigate(["/second-page"]);
  }

  public async getCharactersCount(): Promise<number> {
    const response = await lastValueFrom(
      this.http.get<{info: {count: number}}>(
        "https://rickandmortyapi.com/api/character"
      )
    );
    this.charactersCount = response.info.count;
    return response.info.count;
  }

  public async getLocationsCount(): Promise<number> {
    const response = await lastValueFrom(
      this.http.get<{info: {count: number}}>(
        "https://rickandmortyapi.com/api/location"
      )
    );
    console.log(response);
    this.locationsCount = response.info.count;
    return response.info.count;
  }

  public async getEpisodesCount(): Promise<number> {
    const response = await lastValueFrom(
      this.http.get<{info: {count: number}}>(
        "https://rickandmortyapi.com/api/episode"
      )
    );
    this.episodesCount = response.info.count;
    return response.info.count;
  }
}
