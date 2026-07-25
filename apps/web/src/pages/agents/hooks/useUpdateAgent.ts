import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agentService } from "../services";

export function useUpdateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      environmentId,
      agentId,
      data,
    }: {
      environmentId: string;
      agentId: string;
      data: {
        name?: string;
        description?: string;
      };
    }) => agentService.updateAgent(environmentId, agentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agents", variables.environmentId],
      });
    },
  });
}
