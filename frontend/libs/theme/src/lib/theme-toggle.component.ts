import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ThemeFacade} from "./+state/theme.facades";

@Component({
  selector: "lib-theme-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        class="sr-only peer"
        [checked]="themeFacade.isDarkMode$ | async"
        (change)="themeFacade.toggleTheme()"
      />
      <div
        class="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
      ></div>
    </label>
  `,
})
export class ThemeSwitcherComponent {
  constructor(public themeFacade: ThemeFacade) {}
}
