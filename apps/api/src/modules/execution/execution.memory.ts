import { randomUUID } from "crypto";

import type {
  ExecutionRecord,
  ExecutionStep,
  ExecutionStatus,
} from "./execution.types";

import type { ExecutionStore } from "./execution.interface";

export class MemoryExecutionStore implements ExecutionStore {
  private executions = new Map<string, ExecutionRecord>();

  create(goal: string): ExecutionRecord {
    const execution: ExecutionRecord = {
      id: randomUUID(),

      goal,

      status: "running",

      startedAt: new Date(),

      steps: [],
    };

    this.executions.set(execution.id, execution);

    return execution;
  }

  get(id: string) {
    return this.executions.get(id);
  }

  updateStatus(id: string, status: ExecutionStatus) {
    const execution = this.executions.get(id);

    if (!execution) return;

    execution.status = status;

    if (status !== "running") {
      execution.completedAt = new Date();
    }
  }

  addStep(id: string, step: ExecutionStep) {
    const execution = this.executions.get(id);

    if (!execution) return;

    execution.steps.push(step);
  }
}
