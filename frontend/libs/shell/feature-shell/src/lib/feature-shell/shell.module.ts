import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShellComponent} from "./shell.component";
import {ShellUiModule} from "@frontend/ui";
import {ShellRoutesModule} from "./shell.routes";

@NgModule({
  imports: [CommonModule, ShellComponent, ShellUiModule, ShellRoutesModule],
  exports: [ShellComponent],
})
export class ShellModule {}
