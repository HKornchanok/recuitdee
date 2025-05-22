import {Component} from "@angular/core";
import {ShellUiModule} from "@frontend/ui";

@Component({
  selector: "lib-shell",
  template: `test<lib-shell-layout></lib-shell-layout>`,
  imports: [ShellUiModule],
})
export class ShellComponent {}
