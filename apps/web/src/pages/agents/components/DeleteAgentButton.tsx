import { Button } from "@/components/ui";
import { useDeleteAgent } from "../hooks/useDeleteAgent";

interface DeleteAgentButtonProps {
  environmentId: string;
  agentId: string;
}

export function DeleteAgentButton({
  environmentId,
  agentId,
}: DeleteAgentButtonProps) {
  const mutation = useDeleteAgent();

  return (
    <Button
      variant="destructive"
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          environmentId,
          agentId,
        })
      }
    >
      {mutation.isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
