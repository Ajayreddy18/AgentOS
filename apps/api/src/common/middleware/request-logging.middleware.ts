import type { NextFunction, Request, Response } from "express";

import { logger } from "../logger/logger";

export function requestLoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;

    const log =
      durationMs > 2000 ? logger.warn.bind(logger) : logger.info.bind(logger);

    log(
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs,
      },
      durationMs > 2000 ? "Slow request detected" : "Request completed",
    );
  });

  next();
}
