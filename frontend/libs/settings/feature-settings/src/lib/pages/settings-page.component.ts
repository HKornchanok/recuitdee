import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThemeSwitcherComponent} from "@frontend/theme";

@Component({
  selector: "lib-settings-page",
  templateUrl: "./settings-page.component.html",
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
})
export class SettingsPageComponent {}
