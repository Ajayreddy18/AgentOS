import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const token = useAuthStore((state) => state.token);

  const user = useAuthStore((state) => state.user);

  const loading = useAuthStore((state) => state.loading);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const setToken = useAuthStore((state) => state.setToken);

  const setUser = useAuthStore((state) => state.setUser);

  const setLoading = useAuthStore((state) => state.setLoading);

  const logout = useAuthStore((state) => state.logout);

  return {
    token,
    user,
    loading,
    isAuthenticated,
    setToken,
    setUser,
    setLoading,
    logout,
  };
}
