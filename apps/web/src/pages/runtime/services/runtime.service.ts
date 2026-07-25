import * as api from "../api/runtime.api";

class RuntimeService {
  getRuntimeEvents(conversationId: string) {
    return api.getRuntimeEvents(conversationId);
  }
}

export const runtimeService = new RuntimeService();
