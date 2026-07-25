import { useParams } from "react-router-dom";

import { Button } from "@/components/ui";

import { useState } from "react";

import { SkeletonPage } from "@/components/ui/SKELETON/";

import { EmptyState } from "@/components/feedback";

import { useProjects } from "./hooks";

import { ProjectCard, CreateProjectDialog } from "./components";

export function ProjectsPage() {
  const { organizationId } = useParams();

  const [open, setOpen] = useState(false);

  const { data: projects = [], isLoading } = useProjects(organizationId!);

  if (isLoading) {
    return <SkeletonPage />;
  }

  if (projects.length === 0) {
    return (
      <>
        <EmptyState
          title="No Projects Yet"
          description="Create your first project."
        />

        <div className="mt-6 flex justify-center">
          <Button onClick={() => setOpen(true)}>Create Project</Button>
        </div>

        <CreateProjectDialog
          open={open}
          onOpenChange={setOpen}
          organizationId={organizationId!}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="text-muted-foreground">
            Manage projects inside this organization.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>New Project</Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            organizationId={organizationId!}
            project={project}
          />
        ))}
      </div>

      <CreateProjectDialog
        open={open}
        onOpenChange={setOpen}
        organizationId={organizationId!}
      />
    </div>
  );
}
