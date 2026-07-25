import { useQuery } from "@tanstack/react-query";

import { organizationService } from "../services";

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ["organizations", id],

    queryFn: () => organizationService.getOrganization(id),

    enabled: !!id,
  });
}
