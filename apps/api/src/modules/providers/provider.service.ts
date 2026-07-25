import type {
  GenerateTextInput,
  GenerateTextResponse,
  StreamTextChunk,
} from "./provider.types";

import { GroqProvider } from "./groq.provider";

import { InternalServerError } from "../../common/errors/internal-server-error";

import {
  llmRequestsTotal,
  llmRequestDuration,
} from "../../common/metrics/metrics.registry";

import { retry } from "../../common/retry";
import { withTimeout } from "../../common/timeout";
import { CircuitBreaker } from "../../common/circuit-breaker/circuit-breaker";

export class ProviderService {
  private groqProvider = new GroqProvider();

  private groqCircuitBreaker = new CircuitBreaker({
    name: "groq",
    failureThreshold: 5,
    resetTimeoutMs: 3000,
    successThreshold: 2,
  });

  async generateText(input: GenerateTextInput): Promise<GenerateTextResponse> {
    const endTimer = llmRequestDuration.startTimer({
      provider: input.provider,
      model: input.model,
    });

    try {
      let response: GenerateTextResponse;

      switch (input.provider.toLowerCase()) {
        case "groq":
          response = await this.groqCircuitBreaker.execute(() =>
            retry(
              () =>
                withTimeout(
                  (signal) =>
                    this.groqProvider.generateText({
                      ...input,
                      signal,
                    }),
                  {
                    timeoutMs: 30000,
                    message: "LLM request timed out",
                  },
                ),
              {
                retries: 2,
              },
            ),
          );
          break;

        default:
          throw new InternalServerError(
            `Unsupported provider: ${input.provider}`,
          );
      }

      llmRequestsTotal.inc({
        provider: input.provider,
        model: input.model,
        status: "success",
      });

      return response;
    } catch (error) {
      llmRequestsTotal.inc({
        provider: input.provider,
        model: input.model,
        status: "error",
      });

      throw error;
    } finally {
      endTimer();
    }
  }

  async streamText(
    input: GenerateTextInput,
  ): Promise<AsyncIterable<StreamTextChunk>> {
    const endTimer = llmRequestDuration.startTimer({
      provider: input.provider,
      model: input.model,
    });

    try {
      let stream: AsyncIterable<StreamTextChunk>;

      switch (input.provider.toLowerCase()) {
        case "groq":
          stream = await this.groqCircuitBreaker.execute(() =>
            retry(
              () =>
                withTimeout(
                  async (signal) =>
                    this.groqProvider.streamText({
                      ...input,
                      signal,
                    }),
                  {
                    timeoutMs: 30000,
                    message: "LLM stream timed out",
                  },
                ),
              {
                retries: 2,
              },
            ),
          );
          break;

        default:
          throw new InternalServerError(
            `Unsupported provider: ${input.provider}`,
          );
      }

      llmRequestsTotal.inc({
        provider: input.provider,
        model: input.model,
        status: "success",
      });

      return this.wrapStream(stream, endTimer);
    } catch (error) {
      llmRequestsTotal.inc({
        provider: input.provider,
        model: input.model,
        status: "error",
      });

      endTimer();

      throw error;
    }
  }

  private async *wrapStream(
    stream: AsyncIterable<StreamTextChunk>,
    endTimer: () => void,
  ): AsyncIterable<StreamTextChunk> {
    try {
      for await (const chunk of stream) {
        yield chunk;
      }
    } finally {
      endTimer();
    }
  }
}
