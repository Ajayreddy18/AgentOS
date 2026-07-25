import { useEffect } from "react";

import { getCurrentUser } from "@/app/api/auth.api";

import { useAuth } from "@/hooks/useAuth";

export function useInitializeAuth() {
  const { token, setUser, logout, setLoading } = useAuth();

  useEffect(() => {
    async function initialize() {
      if (!token) {
        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        const response = await getCurrentUser();

        setUser(response.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, [token, setUser, logout, setLoading]);
}
