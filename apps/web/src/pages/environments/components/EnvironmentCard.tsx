import type { Environment } from "../services";

import { Button } from "@/components/ui";

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { EditEnvironmentDialog } from "./EditEnvironmentDialog";
import { DeleteEnvironmentButton } from "./DeleteEnvironmentButton";

interface EnvironmentCardProps {
  projectId: string;
  environment: Environment;
}

export function EnvironmentCard({
  projectId,
  environment,
}: EnvironmentCardProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { organizationId } = useParams<{
    organizationId: string;
  }>();

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{environment.name}</h2>

        <p className="text-sm text-muted-foreground">
          {environment.description || "No description"}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeleteEnvironmentButton
          projectId={projectId}
          environmentId={environment.id}
        />

        <Button
          onClick={() =>
            navigate(
              `/organizations/${organizationId}/projects/${projectId}/environments/${environment.id}`,
            )
          }
        >
          Open Workspace
        </Button>
      </div>

      <EditEnvironmentDialog
        open={open}
        onOpenChange={setOpen}
        projectId={projectId}
        environment={environment}
      />
    </div>
  );
}
