import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteOrganization } from "../api/deleteOrganization.api";

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
  });
}
