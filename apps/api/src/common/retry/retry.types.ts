export interface RetryOptions {
  retries: number;

  baseDelayMs?: number;

  maxDelayMs?: number;

  exponential?: boolean;

  jitter?: boolean;

  retryIf?: (error: unknown) => boolean;

  onRetry?: (
    error: unknown,
    attempt: number,
    delay: number,
  ) => void | Promise<void>;
}
