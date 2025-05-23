    import { CommonModule } from "@angular/common";
import {Component} from "@angular/core";
import { CharacterService } from "@frontend/search-data-access";

@Component({
  selector: "lib-search-page",
  templateUrl: "./search-page.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class SearchPageComponent {
  constructor(private readonly characterService: CharacterService) {}
  public characters: any[] = [];
  
  public getCharacters() {
    this.characterService.getCharacters(1).subscribe((characters) => {
      this.characters = characters as any[];
    });
  }
}