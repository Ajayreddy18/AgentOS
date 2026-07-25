export class CircuitBreakerOpenError extends Error {
  readonly nextAttemptAt?: number;

  constructor(message = "Circuit breaker is OPEN", nextAttemptAt?: number) {
    super(message);

    this.name = "CircuitBreakerOpenError";

    this.nextAttemptAt = nextAttemptAt;
  }
}
