import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Character} from "@frontend/search-data-access";

@Component({
  selector: "lib-about",
  templateUrl: "./about.component.html",
  standalone: true,
  imports: [CommonModule],
})
export class AboutComponent {
  @Input() public character: Character | null = null;
}
