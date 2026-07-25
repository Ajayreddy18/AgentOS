import { Button } from "@/components/ui";

import { useDeleteProject } from "../hooks";

interface DeleteProjectButtonProps {
  organizationId: string;

  projectId: string;
}

export function DeleteProjectButton({
  organizationId,
  projectId,
}: DeleteProjectButtonProps) {
  const mutation = useDeleteProject();

  function handleDelete() {
    const confirmed = window.confirm("Delete this project?");

    if (!confirmed) {
      return;
    }

    mutation.mutate({
      organizationId,
      projectId,
    });
  }

  return (
    <Button onClick={handleDelete} disabled={mutation.isPending}>
      {mutation.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
