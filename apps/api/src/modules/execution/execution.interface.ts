import type {
  ExecutionRecord,
  ExecutionStep,
  ExecutionStatus,
} from "./execution.types";

export interface ExecutionStore {
  create(goal: string): ExecutionRecord;

  get(id: string): ExecutionRecord | undefined;

  updateStatus(id: string, status: ExecutionStatus): void;

  addStep(id: string, step: ExecutionStep): void;
}
