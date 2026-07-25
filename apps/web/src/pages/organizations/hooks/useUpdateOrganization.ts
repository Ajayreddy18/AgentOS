import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrganization } from "../api/updateOrganization.api";

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        slug?: string;
        description?: string;
      };
    }) => updateOrganization(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
  });
}
