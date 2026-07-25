import { useParams } from "react-router-dom";

import { CreateToolDialog } from "./components/CreateToolDialog";

import { ToolCard } from "./components/ToolCard";

import { useTools } from "./hooks/useTools";

import { SkeletonPage } from "@/components/ui/SKELETON/";

import { ErrorState, EmptyState } from "@/components/feedback";

export function ToolsPage() {
  const { agentId } = useParams<{
    organizationId: string;

    projectId: string;

    environmentId: string;

    agentId: string;
  }>();

  const {
    data: tools = [],

    isLoading,

    isError,
  } = useTools(agentId ?? "");

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load tools"
        description="Please try again."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tools</h1>

          <p className="text-muted-foreground">
            Manage tools available for this agent.
          </p>
        </div>

        <CreateToolDialog agentId={agentId ?? ""} />
      </div>

      {tools.length === 0 ? (
        <EmptyState
          title="No Tools Yet"
          description="Create your first tool."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}

              agentId={agentId ?? ""}

              tool={tool}
            />
          ))}
        </div>
      )}
    </div>
  );
}
