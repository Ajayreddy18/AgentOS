export interface AgentRuntime {
  agentId: string;

  prompt: string;

  memories: {
    id: string;
    name: string;
    content: string;
  }[];

  knowledge: {
    id: string;
    name: string;
    content: string;
  }[];

  model: {
    provider: string;
    modelName: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  };

  tools: {
    id: string;
    name: string;
    description: string | null;
    type: string;
    configuration: string | null;
  }[];
}
