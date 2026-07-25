import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toolService } from "../services";

export function useUpdateTool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      toolId,
      data,
    }: {
      agentId: string;

      toolId: string;

      data: {
        name?: string;
        description?: string;
        type?: string;
        configuration?: string;
      };
    }) => toolService.updateTool(agentId, toolId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tools", variables.agentId],
      });
    },
  });
}
