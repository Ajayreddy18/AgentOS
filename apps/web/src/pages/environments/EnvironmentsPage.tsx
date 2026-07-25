import { useState } from "react";

import { useParams } from "react-router-dom";

import { Button } from "@/components/ui";

import { CreateEnvironmentDialog, EnvironmentCard } from "./components";

import { useEnvironments } from "./hooks";

export function EnvironmentsPage() {
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const [open, setOpen] = useState(false);

  const {
    data: environments = [],
    isLoading,
    isError,
  } = useEnvironments(projectId!);

  if (isLoading) {
    return <div className="p-6">Loading environments...</div>;
  }

  if (isError) {
    return <div className="p-6">Failed to load environments.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environments</h1>

          <p className="text-muted-foreground">
            Manage environments inside this project.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>New Environment</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {environments.map((environment) => (
          <EnvironmentCard
            key={environment.id}
            projectId={projectId!}
            environment={environment}
          />
        ))}
      </div>

      <CreateEnvironmentDialog
        open={open}
        onOpenChange={setOpen}
        projectId={projectId!}
      />
    </div>
  );
}
