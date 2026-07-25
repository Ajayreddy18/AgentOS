import { getAuditLogs } from "../api/audit.api";

export const auditService = {
  getAuditLogs(page: number, limit: number) {
    return getAuditLogs(page, limit);
  },
};
