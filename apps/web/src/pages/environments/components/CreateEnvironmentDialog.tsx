import { AppDialog, Input, Button } from "@/components/ui";

import { useState } from "react";

import { useCreateEnvironment } from "../hooks";

interface CreateEnvironmentDialogProps {
  projectId: string;

  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function CreateEnvironmentDialog({
  projectId,
  open,
  onOpenChange,
}: CreateEnvironmentDialogProps) {
  const mutation = useCreateEnvironment();

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        projectId,
        data: {
          name,
          description,
        },
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");

          onOpenChange(false);
        },
      },
    );
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Environment"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Development"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <textarea
            className="w-full rounded-md border p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Development Environment"
          />
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Environment"}
        </Button>
      </form>
    </AppDialog>
  );
}
