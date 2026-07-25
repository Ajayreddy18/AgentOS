import { apiClient } from "./client";

import { normalizeApiError } from "@/lib/api-error";

import { useAuthStore } from "@/store/auth.store";

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const apiError = normalizeApiError(error);

    const url = error.config?.url ?? "";

    const isAuthRequest =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (apiError.status === 401 && !isAuthRequest) {
      useAuthStore.getState().logout();

      window.location.href = "/auth/login";
    }

    return Promise.reject(apiError);
  },
);
