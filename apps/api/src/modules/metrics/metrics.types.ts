export interface MetricCount {
  date: string;
  count: number;
}

export interface AgentUsageMetric {
  agentId: string;

  agentName: string;

  messages: number;

  conversations: number;
}

export interface DashboardMetrics {
  summary: {
    organizations: number;

    projects: number;

    environments: number;

    agents: number;

    conversations: number;

    messages: number;
  };

  activity: {
    messages: MetricCount[];

    conversations: MetricCount[];
  };

  agents: AgentUsageMetric[];
}
