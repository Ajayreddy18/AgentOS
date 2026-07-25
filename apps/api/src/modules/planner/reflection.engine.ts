export interface ReflectionResult {
  shouldContinue: boolean;
  confidence: number;
  reason: string;
}

export class ReflectionEngine {
  reflect(
    llmResponse: { toolCalls?: unknown[] },
    toolResults: unknown[],
  ): ReflectionResult {
    if (!llmResponse.toolCalls?.length) {
      return {
        shouldContinue: false,
        confidence: 1,
        reason: "No further tool calls required.",
      };
    }

    if (toolResults.length === 0) {
      return {
        shouldContinue: false,
        confidence: 0.2,
        reason: "No tool results were produced.",
      };
    }

    return {
      shouldContinue: true,
      confidence: 0.95,
      reason: "Tool execution completed. Continue planning.",
    };
  }
}
