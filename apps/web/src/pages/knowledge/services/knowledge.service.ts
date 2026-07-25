import * as api from "../api/knowledge.api";

import type { CreateKnowledgeInput, UpdateKnowledgeInput } from "./types";

class KnowledgeService {
  getKnowledges(agentId: string) {
    return api.getKnowledges(agentId);
  }

  createKnowledge(agentId: string, data: CreateKnowledgeInput) {
    return api.createKnowledge(agentId, data);
  }

  updateKnowledge(
    agentId: string,
    knowledgeId: string,
    data: UpdateKnowledgeInput,
  ) {
    return api.updateKnowledge(agentId, knowledgeId, data);
  }

  deleteKnowledge(agentId: string, knowledgeId: string) {
    return api.deleteKnowledge(agentId, knowledgeId);
  }
}

export const knowledgeService = new KnowledgeService();
