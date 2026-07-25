import type {
  LoginPayload,
  RegisterPayload,
  User,
} from "@/features/auth/types/auth";

export interface LoginResponse {
  success: boolean;

  data: {
    accessToken: string;

    user: User;
  };
}

export interface RegisterResponse {
  success: boolean;

  data: {
    accessToken: string;

    user: User;
  };
}

export type LoginRequest = LoginPayload;

export type RegisterRequest = RegisterPayload;
