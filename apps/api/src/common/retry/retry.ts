import { logger } from "../logger/logger";

import type { RetryOptions } from "./retry.types";

import { RetryExceededError } from "./retry.errors";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function calculateDelay(attempt: number, options: RetryOptions): number {
  const baseDelay = options.baseDelayMs ?? 500;

  const maxDelay = options.maxDelayMs ?? 5000;

  let delay = baseDelay;

  if (options.exponential !== false) {
    delay = baseDelay * Math.pow(2, attempt - 1);
  }

  delay = Math.min(delay, maxDelay);

  if (options.jitter !== false) {
    const jitter = Math.random() * delay * 0.2;

    delay += jitter;
  }

  return Math.round(delay);
}

export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> {
  const retries = options.retries;

  let lastError: unknown;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      const shouldRetry =
        attempt <= retries && (options.retryIf ? options.retryIf(error) : true);

      if (!shouldRetry) {
        break;
      }

      const delay = calculateDelay(attempt, options);

      logger.warn(
        {
          attempt,
          retries,
          delay,
          error,
        },
        "Retrying operation",
      );

      if (options.onRetry) {
        await options.onRetry(error, attempt, delay);
      }

      await sleep(delay);
    }
  }

  throw new RetryExceededError(
    "Retry attempts exhausted",
    lastError,
    retries + 1,
  );
}
