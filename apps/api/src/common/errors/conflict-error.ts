import { AppError } from "./app-error";

export class ConflictError extends AppError {
  constructor(message = "Resource already exists", details?: unknown) {
    super(message, 409, "CONFLICT_ERROR", details);
  }
}
