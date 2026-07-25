import { ZodError } from "zod";
import { ValidationError } from "../errors/validation-error";

export function createValidationError(error: ZodError): ValidationError {
  return new ValidationError(
    "Validation failed",

    error.issues.map((issue) => ({
      path: issue.path.map(String),

      message: issue.message,
    })),
  );
}
