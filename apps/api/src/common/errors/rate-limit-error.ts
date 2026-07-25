import { AppError } from "./app-error";

export class RateLimitError extends AppError {
  constructor(message = "Too many requests", details?: unknown) {
    super(message, 429, "RATE_LIMIT_ERROR", details);
  }
}
