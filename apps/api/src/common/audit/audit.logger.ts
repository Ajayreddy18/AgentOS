import { logger } from "../logger/logger";

import type { AuditLogger } from "./audit.interface";

import type { AuditEvent } from "./audit.types";

export class DefaultAuditLogger implements AuditLogger {
  async log(event: AuditEvent): Promise<void> {
    logger.info(
      {
        audit: event,
      },
      "Audit Event",
    );
  }
}
