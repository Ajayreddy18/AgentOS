export type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export interface CircuitBreakerOptions {
  failureThreshold: number;

  resetTimeoutMs: number;

  successThreshold?: number;

  name?: string;
}

export interface CircuitBreakerStats {
  state: CircuitState;

  failures: number;

  successes: number;

  nextAttemptAt?: number;
}
