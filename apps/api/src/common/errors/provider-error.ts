import { AppError } from "./app-error";

export class ProviderError extends AppError {
  constructor(message = "AI provider error") {
    super(message, 502, "PROVIDER_ERROR");
  }
}
