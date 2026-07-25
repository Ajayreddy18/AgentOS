import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation";

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

      <div className="flex flex-1 flex-col">
        {/* Header */}

        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <h1 className="text-lg font-semibold">AgentOS</h1>

          <p className="text-sm text-muted-foreground">Header</p>
        </header>

        {/* Page Content */}

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
