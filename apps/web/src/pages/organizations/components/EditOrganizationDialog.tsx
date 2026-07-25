import { AppDialog, Textarea, Input, Button } from "@/components/ui";

import { useState } from "react";
import { useUpdateOrganization } from "../hooks";

import type { Organization } from "@/features/organization/types";
interface EditOrganizationDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  organization: Organization;
}

export function EditOrganizationDialog({
  open,
  onOpenChange,
  organization,
}: EditOrganizationDialogProps) {
  const mutation = useUpdateOrganization();

  const [name, setName] = useState(organization.name);

  const [slug, setSlug] = useState(organization.slug);

  const [description, setDescription] = useState(
    organization.description ?? "",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(
      {
        id: organization.id,
        data: {
          name,
          slug,
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
      onOpenChange={onOpenChange}
      title="Edit Organization"
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
          {mutation.isPending ? "Creating..." : "Update Organization"}
        </Button>
      </form>
    </AppDialog>
  );
}
