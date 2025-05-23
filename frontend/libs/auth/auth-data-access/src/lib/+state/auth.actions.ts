import {createAction, props} from "@ngrx/store";
import { Credentials, User } from "./auth.state";

export enum ActionTypes {
  Init = "[Auth] Init",
  Login = "[Auth] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailure = "[Auth] Login Failure",
  SignUp = "[Auth] Sign Up",
  SignUpSuccess = "[Auth] Sign Up Success",
  SignUpFailure = "[Auth] Sign Up Failure",
  Logout = "[Auth] Logout",
}

export const init = createAction(ActionTypes.Init);
export const login = createAction(ActionTypes.Login, props<Credentials>());
export const loginSuccess = createAction(
  ActionTypes.LoginSuccess,
  props<{user: User, token: string}>()
);
export const loginFailure = createAction(
  ActionTypes.LoginFailure,
  props<{error: string}>()
);

export const signUp = createAction(ActionTypes.SignUp, props<User>());
export const signUpSuccess = createAction(
  ActionTypes.SignUpSuccess,
  props<{user: User, token: string}>() 
);

export const signUpFailure = createAction(
  ActionTypes.SignUpFailure,
  props<{error: string}>()
);

export const logout = createAction(ActionTypes.Logout);
