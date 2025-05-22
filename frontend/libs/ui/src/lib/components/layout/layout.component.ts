import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "lib-shell-layout",
  template: ` <router-outlet></router-outlet> `,
  imports: [RouterOutlet],
  standalone: true,
})
export class LayoutComponent {}
