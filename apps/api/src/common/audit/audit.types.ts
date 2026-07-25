export interface AuditEvent {
  action: string;

  actorId: string;

  resourceType: string;

  resourceId: string;

  metadata?: Record<string, unknown>;

  timestamp: Date;
}
