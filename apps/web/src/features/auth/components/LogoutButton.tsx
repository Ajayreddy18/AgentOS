import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

export function LogoutButton() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();

    navigate("/auth/login", {
      replace: true,
    });
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
