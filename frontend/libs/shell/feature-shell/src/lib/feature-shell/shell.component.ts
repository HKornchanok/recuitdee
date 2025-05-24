import {Component} from "@angular/core";
import {ShellUiModule} from "@frontend/ui";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "lib-shell",
  standalone: true,
  imports: [ShellUiModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class ShellComponent {}
