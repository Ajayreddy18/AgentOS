export interface AnalyticsOverview {
  totalOrganizations: number;
  totalProjects: number;
  totalAgents: number;
  totalConversations: number;
  totalMessages: number;
  totalKnowledgeBases: number;
  totalTools: number;

  toolExecutions: number;
  totalLLMCalls: number;

  averageLatencyMs: number;
  averageResponseLength: number;

  successfulToolExecutions: number;
  failedToolExecutions: number;
  successRate: number;

  averageMessagesPerConversation: number;

  runtimeEvents: number;
  plannerRuns: number;
  retrievalRuns: number;
  memoryRuns: number;
}
