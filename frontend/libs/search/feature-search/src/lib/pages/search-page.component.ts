import {CommonModule} from "@angular/common";
import {
  Component,
  OnInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import {
  Character,
  CharacterPagination,
  SearchState,
} from "@frontend/search-data-access";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {CharacterCardComponent} from "../components/character-card/character-card.component";
import {FormsModule} from "@angular/forms";
import {FilterComponent} from "../components/filter/filter.component";
import {SearchFacade} from "@frontend/search-data-access";
import {Subject, takeUntil} from "rxjs";
@Component({
  selector: "lib-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    InfiniteScrollDirective,
    CharacterCardComponent,
    FormsModule,
    FilterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public characters: Character[] = [];
  public state!: SearchState;
  public pagination: CharacterPagination = {
    count: 0,
    pages: 0,
    next: "",
    prev: "",
    filter: {searchQuery: "", gender: "", status: ""},
  };
  public loading = false;
  public count = 0;
  public scrollDistance = 1;
  public throttle = 300;

  public searchQuery = "";
  public selectedGender = "";
  public selectedStatus = "";
  public showScrollTop = false;

  constructor(private readonly searchFacade: SearchFacade) {}

  public ngOnInit(): void {
    this.searchFacade.loadCharacters(this.pagination, true);
    this.searchFacade.results$
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.characters = results;
      });
    this.searchFacade.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.state = state;
        this.pagination = state.pagination;
        this.loading = state.loading;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onScroll(): void {
    if (this.pagination.next) {
      this.loadMoreCharacters();
    }
  }

  private async loadMoreCharacters(): Promise<void> {
    this.searchFacade.loadCharacters(this.pagination, false);
  }

  public trackByFn(index: number, character: Character): string {
    return character.id.toString();
  }

  public async onSearch(): Promise<void> {
    this.searchFacade.updateFilter({
      searchQuery: this.searchQuery,
      gender: this.selectedGender,
      status: this.selectedStatus,
    });
    this.searchFacade.loadCharacters(this.pagination, true);
  }

  public async onFilterChange(): Promise<void> {
    this.searchFacade.updateFilter({
      searchQuery: this.searchQuery,
      gender: this.selectedGender,
      status: this.selectedStatus,
    });
    this.searchFacade.loadCharacters(this.pagination, true);
  }
}
