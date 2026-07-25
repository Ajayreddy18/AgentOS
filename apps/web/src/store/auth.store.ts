import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/features/auth/types/auth";

interface AuthStore {
  token: string | null;

  user: User | null;

  isAuthenticated: boolean;

  loading: boolean;

  setToken(token: string | null): void;

  setUser(user: User | null): void;

  setLoading(loading: boolean): void;

  logout(): void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,

      user: null,

      isAuthenticated: false,

      loading: false,

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setLoading: (loading) =>
        set({
          loading,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          loading: false,
          isAuthenticated: false,
        }),
    }),
    {
      name: "agentos-auth",

      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
