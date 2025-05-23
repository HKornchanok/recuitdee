export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export interface User {
  username: string;
    firstName: string;
    lastName: string;
    password?: string;
}

export interface Credentials {
  username: string;
  password: string;
}