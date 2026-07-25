import { logger } from "../logger/logger";

import { CircuitBreakerOpenError } from "./circuit-breaker.errors";

import type {
  CircuitBreakerOptions,
  CircuitBreakerStats,
  CircuitState,
} from "./circuit-breaker.types";

export class CircuitBreaker {
  private state: CircuitState = "CLOSED";

  private failures = 0;

  private successes = 0;

  private nextAttemptAt?: number;

  constructor(private readonly options: CircuitBreakerOptions) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (this.nextAttemptAt && Date.now() >= this.nextAttemptAt) {
        this.transitionToHalfOpen();
      } else {
        throw new CircuitBreakerOpenError(
          `${this.options.name ?? "Circuit"} is OPEN`,
          this.nextAttemptAt,
        );
      }
    }

    try {
      const result = await operation();

      this.onSuccess();

      return result;
    } catch (error) {
      this.onFailure();

      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state === "HALF_OPEN") {
      this.successes++;

      const threshold = this.options.successThreshold ?? 1;

      if (this.successes >= threshold) {
        this.transitionToClosed();
      }

      return;
    }

    this.failures = 0;
  }

  private onFailure(): void {
    this.failures++;

    if (
      this.state === "HALF_OPEN" ||
      this.failures >= this.options.failureThreshold
    ) {
      this.transitionToOpen();
    }
  }

  private transitionToClosed(): void {
    logger.info(
      {
        circuit: this.options.name,
      },
      "Circuit breaker CLOSED",
    );

    this.state = "CLOSED";

    this.failures = 0;

    this.successes = 0;

    this.nextAttemptAt = undefined;
  }

  private transitionToOpen(): void {
    this.state = "OPEN";

    this.successes = 0;

    this.nextAttemptAt = Date.now() + this.options.resetTimeoutMs;

    logger.warn(
      {
        circuit: this.options.name,
        resetAt: this.nextAttemptAt,
      },
      "Circuit breaker OPEN",
    );
  }

  private transitionToHalfOpen(): void {
    logger.info(
      {
        circuit: this.options.name,
      },
      "Circuit breaker HALF_OPEN",
    );

    this.state = "HALF_OPEN";

    this.failures = 0;

    this.successes = 0;
  }

  getStats(): CircuitBreakerStats {
    return {
      state: this.state,

      failures: this.failures,

      successes: this.successes,

      nextAttemptAt: this.nextAttemptAt,
    };
  }
}
