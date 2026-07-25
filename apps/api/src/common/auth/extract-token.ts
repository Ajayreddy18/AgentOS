import type { Request } from "express";

import { AuthorizationError } from "../errors/authorization-error";

export function extractBearerToken(request: Request): string {
  const header = request.header("Authorization");

  if (!header) {
    throw new AuthorizationError("Missing Authorization header");
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AuthorizationError("Invalid bearer token");
  }

  return token;
}
