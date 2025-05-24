import {CommonModule} from "@angular/common";
import {Component, Input, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Component({
  selector: "lib-character-card",
  templateUrl: "./character-card.component.html",
  styleUrls: ["./character-card.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: Character;
  firstEpisodeName: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.character.episode && this.character.episode.length > 0) {
      const firstEpisodeUrl = this.character.episode[0];
      this.http.get<any>(firstEpisodeUrl).subscribe({
        next: (episode) => {
          this.firstEpisodeName = episode.name;
        },
        error: () => {
          this.firstEpisodeName = "Unknown";
        },
      });
    }
  }
}
