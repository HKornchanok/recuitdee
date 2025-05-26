import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {Episode} from "@frontend/search-data-access";

@Component({
  selector: "lib-episode-card",
  templateUrl: "./episode-card.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class EpisodeCardComponent {
  @Input() episode!: Episode;
}
