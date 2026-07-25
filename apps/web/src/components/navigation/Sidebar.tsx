import { navigation } from "@/config/navigation";
import { SidebarItem } from "./SidebarItem";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/auth.store";

import { LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();

    navigate("/auth/login", {
      replace: true,
    });
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo */}

      <div className="border-b p-6">
        <h1 className="text-xl font-bold">AgentOS</h1>

        <p className="text-sm text-muted-foreground">AI Operating System</p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t p-4">
        <div className="mb-4">
          <p className="font-medium">{user?.name}</p>

          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
