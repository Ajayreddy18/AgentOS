import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agentService } from "../services";

export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      environmentId,
      data,
    }: {
      environmentId: string;
      data: {
        name: string;
        description?: string;
      };
    }) => agentService.createAgent(environmentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["agents", variables.environmentId],
      });
    },
  });
}
