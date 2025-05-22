import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

@Component({
  selector: "app-auth-page",
  imports: [RouterModule, LoginComponent, RegisterComponent],
  templateUrl: "./auth-page.component.html",
  styleUrl: "./auth-page.component.scss",
})
export class AuthPageComponent {}
