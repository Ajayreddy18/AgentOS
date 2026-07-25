import { logger } from "../logger/logger";

import type { RateLimitEntry, RateLimitOptions } from "./rate-limit.types";

import { RateLimitExceededError } from "./rate-limit.errors";

export class RateLimiter {
  private readonly store = new Map<string, RateLimitEntry>();

  consume(key: string, options: RateLimitOptions): void {
    const now = Date.now();

    let entry = this.store.get(key);

    if (!entry || now >= entry.resetAt) {
      entry = {
        count: 0,
        resetAt: now + options.windowMs,
      };

      this.store.set(key, entry);
    }

    if (entry.count >= options.limit) {
      const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);

      logger.warn(
        {
          key,
          limit: options.limit,
          retryAfterSeconds,
        },
        "Rate limit exceeded",
      );

      throw new RateLimitExceededError(retryAfterSeconds);
    }

    entry.count++;

    logger.debug(
      {
        key,
        count: entry.count,
        limit: options.limit,
      },
      "Rate limit consumed",
    );
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}
