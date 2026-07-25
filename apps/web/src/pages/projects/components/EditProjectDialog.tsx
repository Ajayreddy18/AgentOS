import { AppDialog } from "@/components/ui";

import { useState } from "react";

import { useUpdateProject } from "../hooks";

import type { Project } from "../services";

import { toast } from "sonner";

interface EditProjectDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  organizationId: string;

  project: Project;
}

export function EditProjectDialog({
  open,
  onOpenChange,
  organizationId,
  project,
}: EditProjectDialogProps) {
  const mutation = useUpdateProject();

  const [name, setName] = useState(project.name);

  const [description, setDescription] = useState(project.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        organizationId,
        projectId: project.id,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess: () => {
          toast.success("Project updated successfully.");

          onOpenChange(false);
        },

        onError: () => {
          toast.error("Failed to update project.");
        },
      },
    );
  }

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title="Edit Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating..." : "Update Project"}
        </button>
      </form>
    </AppDialog>
  );
}
