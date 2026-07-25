import * as api from "../api/agent.api";

import type { CreateAgentInput, UpdateAgentInput } from "./types";

class AgentService {
  getAgents(environmentId: string) {
    return api.getAgents(environmentId);
  }

  createAgent(environmentId: string, data: CreateAgentInput) {
    return api.createAgent(environmentId, data);
  }

  updateAgent(environmentId: string, agentId: string, data: UpdateAgentInput) {
    return api.updateAgent(environmentId, agentId, data);
  }

  deleteAgent(environmentId: string, agentId: string) {
    return api.deleteAgent(environmentId, agentId);
  }
}

export const agentService = new AgentService();
