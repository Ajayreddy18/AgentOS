import { SkeletonCard } from "@/components/ui/SKELETON/";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

export function DashboardPage() {
  const {
    data,

    isLoading,
  } = useDashboard();

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>

        <p className="mt-2 text-muted-foreground">Welcome back.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">Projects</p>

          <p className="mt-2 text-3xl font-bold">{data?.totalProjects}</p>
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">Agents</p>

          <p className="mt-2 text-3xl font-bold">{data?.totalAgents}</p>
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">Models</p>

          <p className="mt-2 text-3xl font-bold">{data?.totalModels}</p>
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">Messages</p>

          <p className="mt-2 text-3xl font-bold">{data?.totalMessages}</p>
        </div>
      </div>
    </div>
  );
}
