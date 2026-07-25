import { AppDialog, Textarea, Input, Button } from "@/components/ui";

import { useState } from "react";
import { useCreateOrganization } from "../hooks";

interface CreateOrganizationDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function CreateOrganizationDialog({
  open,
  onOpenChange,
}: CreateOrganizationDialogProps) {
  const mutation = useCreateOrganization();

  const [name, setName] = useState("");

  const [slug, setSlug] = useState("");

  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        name,
        slug,
        description,
      },
      {
        onSuccess: () => {
          setName("");
          setSlug("");
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
      title="Create Organization"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>

          <Input
            value={name}

            onChange={(e) => setName(e.target.value)}
            placeholder="AgentOS"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>

          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="agentos"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="AI Operating System"
          />
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Organization"}
        </Button>
      </form>
    </AppDialog>
  );
}
