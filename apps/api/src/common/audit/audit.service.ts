import type { AuditEvent } from "./audit.types";

import type { AuditLogger } from "./audit.interface";

import { DefaultAuditLogger } from "./audit.logger";

export class AuditService {
  constructor(
    private readonly logger: AuditLogger = new DefaultAuditLogger(),
  ) {}

  async record(event: AuditEvent): Promise<void> {
    await this.logger.log(event);
  }
}
