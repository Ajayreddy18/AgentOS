export class RetryExceededError extends Error {
  readonly cause: unknown;

  readonly attempts: number;

  constructor(message: string, cause: unknown, attempts: number) {
    super(message);

    this.name = "RetryExceededError";

    this.cause = cause;

    this.attempts = attempts;
  }
}
