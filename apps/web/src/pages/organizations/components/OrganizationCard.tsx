import type { Organization } from "@/features/organization/types";
import { useState } from "react";
import { EditOrganizationDialog } from "./EditOrganizationDialog";
import { Button } from "@/components/ui";
import { DeleteOrganizationDialog } from "./DeleteOrganizationDialog";
import { useNavigate } from "react-router-dom";

interface OrganizationCardProps {
  organization: Organization;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{organization.name}</h2>

          <p className="text-sm text-muted-foreground">
            {organization.description || "No description"}
          </p>

          <div className="text-xs text-muted-foreground">
            Slug: {organization.slug}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() =>
              navigate(`/organizations/${organization.id}/projects`)
            }
          >
            Open Projects
          </Button>

          <Button onClick={() => setEditOpen(true)}>Edit</Button>

          <Button onClick={() => setDeleteOpen(true)} variant="destructive">
            Delete
          </Button>
        </div>
      </div>

      <EditOrganizationDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        organization={organization}
      />
      <DeleteOrganizationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        organization={organization}
      />
    </>
  );
}
