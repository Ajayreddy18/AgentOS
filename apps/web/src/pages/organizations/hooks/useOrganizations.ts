import { useQuery } from "@tanstack/react-query";

import { organizationService } from "../services";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],

    queryFn: () => organizationService.getOrganizations(),
  });
}
