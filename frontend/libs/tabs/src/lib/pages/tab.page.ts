import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";

@Component({
  selector: "lib-tab-page",
  templateUrl: "./tab.page.html",
  styleUrls: ["./tab.page.scss"],
  standalone: true,
  imports: [RouterModule],
})
export class TabPageComponent {}
