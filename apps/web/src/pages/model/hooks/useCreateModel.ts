import { useMutation, useQueryClient } from "@tanstack/react-query";

import { modelService } from "../services";

import type { ModelFormValues } from "../components/ModelForm";

interface CreateModelInput {
  agentId: string;

  data: ModelFormValues;
}

export function useCreateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId, data }: CreateModelInput) =>
      modelService.createModel(agentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["models", variables.agentId],
      });
    },
  });
}
