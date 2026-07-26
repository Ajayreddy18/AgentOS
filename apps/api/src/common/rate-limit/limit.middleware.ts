import type { NextFunction, Request, Response } from "express";

import { logger } from "../logger/logger";

import { RateLimitStore } from "./rate-limit.store";
import { rateLimitConfig } from "./rate-limit.config";
import { RateLimitExceededError } from "./rate-limit.errors";

const store = new RateLimitStore();

export function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  store.clearExpired();

  const config = rateLimitConfig;

  const key = req.ip ?? req.headers["x-forwarded-for"]?.toString() ?? "unknown";

  console.log({
    ip: req.ip,
    forwarded: req.headers["x-forwarded-for"],
  });

  const entry = store.increment(key, config.windowMs);

  const remaining = Math.max(0, config.maxRequests - entry.count);

  const retryAfterSeconds = Math.ceil((entry.resetAt - Date.now()) / 1000);

  res.setHeader("X-RateLimit-Limit", config.maxRequests.toString());

  res.setHeader("X-RateLimit-Remaining", remaining.toString());

  res.setHeader(
    "X-RateLimit-Reset",
    Math.floor(entry.resetAt / 1000).toString(),
  );

  if (entry.count > config.maxRequests) {
    res.setHeader("Retry-After", retryAfterSeconds.toString());

    logger.warn(
      {
        ip: key,
        retryAfterSeconds,
      },
      "Rate limit exceeded",
    );

    throw new RateLimitExceededError(retryAfterSeconds);
  }

  next();
}
