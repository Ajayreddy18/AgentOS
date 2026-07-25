import { AppDialog } from "@/components/ui";

import { useState } from "react";

import { useCreateProject } from "../hooks";

import { toast } from "sonner";

interface CreateProjectDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  organizationId: string;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  organizationId,
}: CreateProjectDialogProps) {
  const mutation = useCreateProject();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        organizationId,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully.");

          setName("");
          setDescription("");

          onOpenChange(false);
        },

        onError: () => {
          toast.error("Failed to create project.");
        },
      },
    );
  }

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title="Create Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="AgentOS Backend"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Production AI Backend"
          />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Project"}
        </button>
      </form>
    </AppDialog>
  );
}
