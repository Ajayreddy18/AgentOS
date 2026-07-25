import { Button } from "@/components/ui";

import { useDeleteTool } from "../hooks/useDeleteTool";

interface Props {
  agentId: string;

  toolId: string;
}

export function DeleteToolButton({ agentId, toolId }: Props) {
  const mutation = useDeleteTool();

  return (
    <Button
      variant="destructive"
      onClick={() =>
        mutation.mutate({
          agentId,
          toolId,
        })
      }
    >
      Delete
    </Button>
  );
}
