import { logger } from "../logger/logger";

import type { TimeoutOptions } from "./timeout.types";

import { TimeoutError } from "./timeout.errors";

export async function withTimeout<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  options: TimeoutOptions,
): Promise<T> {
  const controller = new AbortController();

  const { timeoutMs, message } = options;

  const timeoutHandle = setTimeout(() => {
    logger.warn(
      {
        timeoutMs,
      },
      "Operation timed out",
    );

    controller.abort(new TimeoutError(timeoutMs, message));
  }, timeoutMs);

  try {
    return await operation(controller.signal);
  } finally {
    clearTimeout(timeoutHandle);
  }
}
