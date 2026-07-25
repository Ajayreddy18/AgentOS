import { AppDialog, Button, Input } from "@/components/ui";

import { useState } from "react";

import { useUpdateEnvironment } from "../hooks";

import type { Environment } from "../services";

interface EditEnvironmentDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  projectId: string;

  environment: Environment;
}

export function EditEnvironmentDialog({
  open,
  onOpenChange,
  projectId,
  environment,
}: EditEnvironmentDialogProps) {
  const mutation = useUpdateEnvironment();

  const [name, setName] = useState(environment.name);

  const [description, setDescription] = useState(
    () => environment.description ?? "",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        projectId,
        environmentId: environment.id,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setName(environment.name);
          setDescription(environment.description ?? "");
        }

        onOpenChange(nextOpen);
      }}
      title="Edit Environment"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <textarea
            className="w-full rounded-md border p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating..." : "Update Environment"}
        </Button>
      </form>
    </AppDialog>
  );
}
