import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThemeService} from "./theme.service";

@Component({
  selector: "lib-theme-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="themeService.toggleTheme()"
      class="button p-2 text-foreground"
      [attr.aria-label]="
        'Toggle ' +
        ((themeService.isDarkMode$ | async) ? 'light' : 'dark') +
        ' mode'
      "
    >
      {{ (themeService.isDarkMode$ | async) ? "Light" : "Dark" }}
    </button>
  `,
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}
}
