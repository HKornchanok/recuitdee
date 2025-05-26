import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Episode} from "@frontend/search-data-access";
import {EpisodeCardComponent} from "../episode-card/episode-card.component";

@Component({
  selector: "lib-episodes",
  templateUrl: "./episodes.component.html",
  standalone: true,
  imports: [CommonModule, EpisodeCardComponent],
})
export class EpisodesComponent {
  @Input() episodes!: Episode[] | undefined;
}
