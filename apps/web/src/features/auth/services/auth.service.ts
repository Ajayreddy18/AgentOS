import { apiClient } from "@/api";

import { API } from "@/api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../services/auth.types";

class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API.auth.login,

      payload,
    );

    return response.data;
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      API.auth.register,

      payload,
    );

    return response.data;
  }
}

export const authService = new AuthService();
