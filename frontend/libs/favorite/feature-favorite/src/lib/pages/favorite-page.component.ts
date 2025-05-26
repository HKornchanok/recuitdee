import {Component, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FavoriteFacade} from "@frontend/favorite-data-access";
import {Character} from "@frontend/search-data-access";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CharacterCardComponent} from "@frontend/feature-search";
import {Router} from "@angular/router";
import {FilterComponent} from "../filter/filter.component";
@Component({
  selector: "lib-favorite-page",
  templateUrl: "./favorite-page.component.html",
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, FilterComponent, FormsModule],
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  public favorites: Character[] = [];
  private destroy$ = new Subject<void>();
  public selectedGender = "";
  public selectedStatus = "";
  public isFiltersExpanded = false;
  public isGenderActionSheetOpen = false;
  public isStatusActionSheetOpen = false;
  public searchQuery = "";

  genderOptions = [
    {value: "", label: "All Genders"},
    {value: "Male", label: "Male"},
    {value: "Female", label: "Female"},
    {value: "Genderless", label: "Genderless"},
    {value: "unknown", label: "Unknown"},
  ];

  constructor(
    private readonly favoriteFacade: FavoriteFacade,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.favoriteFacade
      .getFavorites$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByFn(index: number, character: Character): string {
    return character.id.toString();
  }

  public navigateToCharacterDetail(id: number): void {
    this.router.navigate([`inside/search/${id}`]);
  }

  public onGenderChange(gender: string): void {
    this.selectedGender = gender;
  }

  public onStatusChange(status: string): void {
    this.selectedStatus = status;
  }

  public onSearch(): void {
    this.applyFilters();
  }

  public onFilterChange(): void {
    this.applyFilters();
  }

  private async applyFilters(): Promise<void> {
    this.favoriteFacade
      .getFavorites$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (favorites) => {
        this.favorites = favorites.filter((character) => {
          const nameMatch =
            !this.searchQuery ||
            character.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase());
          const genderMatch =
            !this.selectedGender || character.gender === this.selectedGender;
          const statusMatch =
            !this.selectedStatus || character.status === this.selectedStatus;
          return nameMatch && genderMatch && statusMatch;
        });
      });
  }
}
