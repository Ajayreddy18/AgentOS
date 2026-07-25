import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toolService } from "../services";

export function useCreateTool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      data,
    }: {
      agentId: string;

      data: {
        name: string;
        description?: string;
        type: string;
        configuration?: string;
      };
    }) => toolService.createTool(agentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tools", variables.agentId],
      });
    },
  });
}
