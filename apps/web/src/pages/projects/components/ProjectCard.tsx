import type { Project } from "../services";

import { Button } from "@/components/ui";

import { useState } from "react";

import { EditProjectDialog } from "./EditProjectDialog";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  organizationId: string;
  project: Project;
}

export function ProjectCard({ organizationId, project }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{project.name}</h2>

        <p className="text-sm text-muted-foreground">
          {project.description || "No description"}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={() =>
            navigate(`/organizations/${organizationId}/projects/${project.id}`)
          }
        >
          Open Project
        </Button>

        <Button onClick={() => setOpen(true)}>Edit</Button>

        <DeleteProjectButton
          organizationId={organizationId}
          projectId={project.id}
        />
      </div>

      <EditProjectDialog
        open={open}
        onOpenChange={setOpen}
        organizationId={organizationId}
        project={project}
      />
    </div>
  );
}
