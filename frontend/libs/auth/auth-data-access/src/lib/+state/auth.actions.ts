import {createAction, props} from "@ngrx/store";
import { User } from "./auth.state";

export const login = createAction("[Auth] Login");
export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{user: User}>()
);

export const logout = createAction("[Auth] Logout");
