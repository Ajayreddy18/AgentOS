import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrganization } from "../api/organization.api";

import type { CreateOrganizationInput } from "@/features/organization/types";

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationInput) => createOrganization(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
  });
}
