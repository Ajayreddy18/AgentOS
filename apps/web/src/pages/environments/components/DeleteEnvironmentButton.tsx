import { Button } from "@/components/ui";

import { useDeleteEnvironment } from "../hooks";

interface DeleteEnvironmentButtonProps {
  projectId: string;

  environmentId: string;
}

export function DeleteEnvironmentButton({
  projectId,
  environmentId,
}: DeleteEnvironmentButtonProps) {
  const mutation = useDeleteEnvironment();

  return (
    <Button
      variant="destructive"
      disabled={mutation.isPending}
      onClick={() => {
        if (!window.confirm("Delete this environment?")) {
          return;
        }

        mutation.mutate({
          projectId,
          environmentId,
        });
      }}
    >
      {mutation.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
