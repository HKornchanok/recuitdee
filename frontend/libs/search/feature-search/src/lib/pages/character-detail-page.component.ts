import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Character, SearchFacade} from "@frontend/search-data-access";
import {Subject, takeUntil} from "rxjs";
import {AboutComponent} from "../components/about/about.component";
import {EpisodesComponent} from "../components/episodes/episodes.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FavoriteFacade} from "@frontend/favorite-data-access";
import {AuthFacade} from "@frontend/auth-data-access";

@Component({
  selector: "lib-character-detail-page",
  templateUrl: "./character-detail-page.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, AboutComponent, EpisodesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CharacterDetailPageComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public characterId: string | null = null;
  public character: Character | null = null;
  public isFavorite = false;
  private isAuthenticated = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchFacade: SearchFacade,
    private readonly router: Router,
    private readonly favoriteFacade: FavoriteFacade,
    private readonly authFacade: AuthFacade,
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.characterId = params.get("id");
      if (this.characterId) {
        const id = parseInt(this.characterId);
        

        this.searchFacade
          .getCharacterById(parseInt(this.characterId))
          .pipe(takeUntil(this.destroy$))
          .subscribe((character) => {
            if (character) {
              this.character = character;

              if (character.episode[0] && !this.character?.episodeDetails) {
                this.searchFacade.loadDetailsByCharacterId(id, character);
              }
            } else if (this.characterId) {
              this.searchFacade.loadCharacterById(id);
            }
          });
      } else {
        this.router.navigate(["/search"]);
      }
    });

    this.authFacade.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    if (this.characterId) {
      this.favoriteFacade
        .getIsFavorite(parseInt(this.characterId))
        .pipe(takeUntil(this.destroy$))
        .subscribe((isFavorite) => {
          this.isFavorite = isFavorite;
        });
    }
  }

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;

    if(!this.isAuthenticated) {
      this.router.navigate(["/auth/login"], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });
      return;
    }

    if (!this.character) return;
    if (this.isFavorite) {
      this.favoriteFacade.addFavorite(this.character);
    } else {
      this.favoriteFacade.removeFavorite(this.character);
    }
  }

  public goBack(): void {
    if(!this.isAuthenticated) {
      this.router.navigate(["/second-page/search"]);
      return;
    }
    if (window.history.length > 1) {
      console.log(window.history);
      window.history.back();
    } else {
      this.router.navigate(["/second-page/search"]);
    }
  }
}
