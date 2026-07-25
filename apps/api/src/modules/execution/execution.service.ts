import type { ExecutionStep } from "./execution.types";

import { MemoryExecutionStore } from "./execution.memory";

export class ExecutionService {
  private store = new MemoryExecutionStore();

  start(goal: string) {
    return this.store.create(goal);
  }

  addStep(executionId: string, step: ExecutionStep) {
    this.store.addStep(executionId, step);
  }

  complete(executionId: string) {
    this.store.updateStatus(executionId, "completed");
  }

  fail(executionId: string) {
    this.store.updateStatus(executionId, "failed");
  }

  get(executionId: string) {
    return this.store.get(executionId);
  }
}
