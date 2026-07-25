export class TimeoutError extends Error {
  readonly timeoutMs: number;

  constructor(timeoutMs: number, message?: string) {
    super(message ?? `Operation timed out after ${timeoutMs} ms`);

    this.name = "TimeoutError";

    this.timeoutMs = timeoutMs;
  }
}
