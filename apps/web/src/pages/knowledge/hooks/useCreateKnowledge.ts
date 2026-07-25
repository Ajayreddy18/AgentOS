import { useMutation, useQueryClient } from "@tanstack/react-query";

import { knowledgeService } from "../services";

export function useCreateKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      data,
    }: {
      agentId: string;
      data: {
        name: string;
        content: string;
      };
    }) => knowledgeService.createKnowledge(agentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["knowledge", variables.agentId],
      });
    },
  });
}
