import type { AuditEvent } from "./audit.types";

export interface AuditLogger {
  log(event: AuditEvent): Promise<void>;
}
