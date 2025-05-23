export interface AuthState {
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
};

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}