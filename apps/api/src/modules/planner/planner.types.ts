import type {
  GenerateTextResponse,
  ToolCall,
} from "../providers/provider.types";

export type PlanningStatus = "running" | "completed" | "failed";

export interface PlanningStep {
  step: number;

  llmResponse?: GenerateTextResponse;

  toolCalls: ToolCall[];

  observations: string[];

  completed: boolean;
}

export interface PlanningState {
  goal: string;

  currentStep: number;

  maxSteps: number;

  status: PlanningStatus;

  steps: PlanningStep[];

  finalReply?: string;
}
