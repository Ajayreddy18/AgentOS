import { useMutation, useQueryClient } from "@tanstack/react-query";

import { modelService } from "../services";

import type { ModelFormValues } from "../components/ModelForm";

interface UpdateModelInput {
  agentId: string;

  modelId: string;

  data: ModelFormValues;
}

export function useUpdateModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId, modelId, data }: UpdateModelInput) =>
      modelService.updateModel(agentId, modelId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["models", variables.agentId],
      });
    },
  });
}
