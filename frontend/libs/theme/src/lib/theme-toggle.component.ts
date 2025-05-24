import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThemeFacade} from "./+state/theme.facades";

@Component({
  selector: "lib-theme-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="themeFacade.toggleTheme()"
      class="button p-2 text-foreground"
      [attr.aria-label]="
        'Toggle ' +
        ((themeFacade.isDarkMode$ | async) ? 'light' : 'dark') +
        ' mode'
      "
    >
      {{ (themeFacade.isDarkMode$ | async) ? "Light" : "Dark" }}
    </button>
  `,
})
export class ThemeSwitcherComponent {
  constructor(public themeFacade: ThemeFacade) {}
}
