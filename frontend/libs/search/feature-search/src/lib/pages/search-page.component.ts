import {CommonModule} from "@angular/common";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {
  CharacterService,
  Character,
  CharacterPagination,
} from "@frontend/search-data-access";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {CharacterCardComponent} from "../components/character-card/character-card.component";
import {FormsModule} from "@angular/forms";
import {FilterComponent} from "../components/filter/filter.component";

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
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public characters: Character[] = [];
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

  constructor(private readonly characterService: CharacterService) {}

  public ngOnInit(): void {
    this.getCharacters();
    this.setupScrollListener();
  }

  public ngOnDestroy(): void {
    this.removeScrollListener();
  }

  private setupScrollListener(): void {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  private removeScrollListener(): void {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  private handleScroll(): void {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      this.showScrollTop = scrollContainer.scrollTop > 100;
    }
  }

  public onScroll(): void {
    this.handleScroll();
    
    if (this.pagination.next) {
      this.loadMoreCharacters();
    }
  }

  public async getCharacters(): Promise<void> {
    const results = await this.characterService.getCharacters(this.pagination, true);
    this.characters = results.results;
    this.pagination = results.pagination;
  }

  public scrollToTop(): void {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        this.showScrollTop = false;
      }, 500);
    }
  }

  private async loadMoreCharacters(): Promise<void> {
    const results = await this.characterService.getCharacters(this.pagination);
    this.characters = [...this.characters, ...results.results];
    this.pagination = results.pagination;
  }

  public trackByFn(index: number, character: Character): string {
    return character.id.toString();
  }

  public async onSearch(): Promise<void> {
    this.scrollToTop();
    this.pagination.filter.searchQuery = this.searchQuery;
    const results = await this.characterService.getCharacters(this.pagination, true);
    this.characters = results.results;
    this.pagination = results.pagination;
  }

  public async onFilterChange(): Promise<void> {
    this.scrollToTop();
    this.pagination.filter.gender = this.selectedGender;
    this.pagination.filter.status = this.selectedStatus;
    const results = await this.characterService.getCharacters(this.pagination, true);
    this.characters = results.results;
    this.pagination = results.pagination;
  }

}
