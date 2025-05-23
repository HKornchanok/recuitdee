import {createAction, props} from "@ngrx/store";
import { Credentials, User } from "./auth.state";

export const init = createAction("[Auth] Init");

export const login = createAction("[Auth] Login", props<Credentials>());
export const loginSuccess = createAction(
  "[Auth] Login Success",
  props<{user: User, token: string}>()
);
export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{error: string}>()
);

export const signUp = createAction("[Auth] Sign Up", props<User>());
export const signUpSuccess = createAction(
  "[Auth] Sign Up Success",
  props<{user: User, token: string}>() 
);

export const signUpFailure = createAction(
  "[Auth] Sign Up Failure",
  props<{error: string}>()
);

export const logout = createAction("[Auth] Logout");
