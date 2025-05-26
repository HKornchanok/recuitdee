import {CommonModule} from "@angular/common";
import {Component, Input, OnInit} from "@angular/core";
import {Character, CharacterService} from "@frontend/search-data-access";

@Component({
  selector: "lib-character-card",
  templateUrl: "./character-card.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: Character;
  firstEpisodeName: string | null = null;

  constructor(private characterService: CharacterService) {}

  async ngOnInit(): Promise<void> {
    if (this.character.episode && this.character.episode.length > 0) {
      const firstEpisode = await this.characterService.getEpisodeByUrl(
        this.character.episode[0] as string
      );
      this.firstEpisodeName = firstEpisode.name || null;
    }
  }
}
