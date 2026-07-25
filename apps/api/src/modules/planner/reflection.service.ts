import type { ReflectionInput, ReflectionResult } from "./reflection.types";

export class ReflectionService {
  reflect(input: ReflectionInput): ReflectionResult {
    if (input.currentStep >= input.maxSteps) {
      return {
        shouldContinue: false,
        reason: "Maximum planning steps reached.",
      };
    }

    return {
      shouldContinue: true,
      reason: "Continue planning.",
    };
  }
}
