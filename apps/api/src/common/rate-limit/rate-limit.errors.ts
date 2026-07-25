import { RateLimitError } from "../errors/rate-limit-error";

export class RateLimitExceededError extends RateLimitError {
  constructor(public readonly retryAfterSeconds: number) {
    super(`Rate limit exceeded. Retry after ${retryAfterSeconds} seconds.`, {
      retryAfterSeconds,
    });
  }
}
