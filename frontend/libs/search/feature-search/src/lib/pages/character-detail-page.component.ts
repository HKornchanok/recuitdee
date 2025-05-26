import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Character, SearchFacade} from "@frontend/search-data-access";
import {Subject, takeUntil} from "rxjs";
import {AboutComponent} from "../components/about/about.component";
import {EpisodesComponent} from "../components/episodes/episodes.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FavoriteFacade} from "@frontend/favorite-data-access";

@Component({
  selector: "lib-character-detail-page",
  templateUrl: "./character-detail-page.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule, AboutComponent, EpisodesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CharacterDetailPageComponent implements OnInit {
  private destroy$ = new Subject<void>();
  characterId: string | null = null;
  character: Character | null = null;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private searchFacade: SearchFacade,
    private router: Router,
    private favoriteFacade: FavoriteFacade
  ) {}

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (!this.character) return;
    if (this.isFavorite) {
      this.favoriteFacade.addFavorite(this.character);
    } else {
      this.favoriteFacade.removeFavorite(this.character);
    }
  }

  ngOnInit(): void {
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
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(["/search"]);
    }
  }
}
