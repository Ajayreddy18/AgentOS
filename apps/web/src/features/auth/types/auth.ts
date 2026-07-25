export interface User {
  id: string;

  name: string;

  email: string;
}

export interface AuthState {
  token: string | null;

  user: User | null;

  isAuthenticated: boolean;

  loading: boolean;
}

export interface LoginPayload {
  email: string;

  password: string;
}

export interface RegisterPayload {
  name: string;

  email: string;

  password: string;
}
