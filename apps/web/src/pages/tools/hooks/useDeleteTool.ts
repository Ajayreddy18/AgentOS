import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toolService } from "../services";

export function useDeleteTool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      toolId,
    }: {
      agentId: string;

      toolId: string;
    }) => toolService.deleteTool(agentId, toolId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tools", variables.agentId],
      });
    },
  });
}
