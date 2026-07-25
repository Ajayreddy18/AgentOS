import { useMutation, useQueryClient } from "@tanstack/react-query";

import { knowledgeService } from "../services";

export function useUpdateKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      agentId,
      knowledgeId,
      data,
    }: {
      agentId: string;
      knowledgeId: string;
      data: {
        name?: string;
        content?: string;
      };
    }) => knowledgeService.updateKnowledge(agentId, knowledgeId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["knowledge", variables.agentId],
      });
    },
  });
}
