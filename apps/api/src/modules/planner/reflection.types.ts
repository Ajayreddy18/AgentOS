export interface ReflectionInput {
  goal: string;

  currentStep: number;

  maxSteps: number;

  toolResults: unknown;
}

export interface ReflectionResult {
  shouldContinue: boolean;

  reason: string;
}
