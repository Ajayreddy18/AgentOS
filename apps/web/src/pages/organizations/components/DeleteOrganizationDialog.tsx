import { AppDialog, Button } from "@/components/ui";

import type { Organization } from "@/features/organization/types";

import { useDeleteOrganization } from "../hooks";

interface DeleteOrganizationDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  organization: Organization;
}

export function DeleteOrganizationDialog({
  open,

  onOpenChange,

  organization,
}: DeleteOrganizationDialogProps) {
  const mutation = useDeleteOrganization();

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Organization"
    >
      <div className="space-y-4">
        <p>
          Are you sure you want to delete
          <strong> {organization.name}</strong>?
        </p>

        <div className="flex gap-2">
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>

          <Button
            onClick={() => {
              mutation.mutate(organization.id, {
                onSuccess: () => {
                  onOpenChange(false);
                },
              });
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
