import { useQuery } from "@tanstack/react-query";

import { auditService } from "../services/audit.service";

export function useAuditLogs(page: number) {
  return useQuery({
    queryKey: ["audit", page],

    queryFn: () => auditService.getAuditLogs(page, 20),
  });
}
