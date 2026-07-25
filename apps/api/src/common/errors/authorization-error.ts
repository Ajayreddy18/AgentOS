import { AppError } from "./app-error";

export class AuthorizationError extends AppError {
  constructor(
    message = "You are not authorized to perform this action",
    details?: unknown,
  ) {
    super(message, 401, "AUTHORIZATION_ERROR", details);
  }
}
