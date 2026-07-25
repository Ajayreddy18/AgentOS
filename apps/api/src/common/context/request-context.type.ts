export interface RequestContext {
  requestId: string;

  userId?: string;

  organizationId?: string;

  conversationId?: string;

  agentId?: string;

  startedAt: Date;
}
