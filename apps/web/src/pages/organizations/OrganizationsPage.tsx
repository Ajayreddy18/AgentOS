import { useOrganizations } from "./hooks";
import { OrganizationCard } from "./components";
import { Button } from "@/components/ui";
import { SkeletonCard } from "@/components/ui/SKELETON/";

import { useState } from "react";
import { CreateOrganizationDialog } from "./components";

import { EmptyState } from "@/components/feedback";

export function OrganizationsPage() {
  const { data, isLoading, isError } = useOrganizations();

  const [open, setOpenState] = useState(false);
  const setOpen = (value: boolean) => {
    setOpenState(value);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-56 rounded bg-muted animate-pulse" />

            <div className="h-4 w-72 rounded bg-muted animate-pulse" />
          </div>

          <div className="h-10 w-40 rounded bg-muted animate-pulse" />
        </div>

        {/* Organization Cards */}

        <div className="space-y-4">
          <SkeletonCard />

          <SkeletonCard />

          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (isError) {
    return <p>Failed to load organizations.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizations</h1>

          <p className="text-muted-foreground">Manage your organizations.</p>
        </div>

        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          New Organization
        </Button>
      </div>

      {/* Organization List */}

      <div className="space-y-4">
        {data?.data.length === 0 ? (
          <EmptyState
            title="No Organizations Yet"
            description="Create your first organization to start managing projects and AI agents."
            actionLabel="Create Organization"
            onAction={() => setOpen(true)}
          />
        ) : (
          data?.data.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))
        )}
      </div>

      <CreateOrganizationDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
