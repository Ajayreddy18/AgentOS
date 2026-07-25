import type { NextFunction, Request, Response } from "express";

import {
  activeHttpRequests,
  httpRequestDuration,
  httpRequestsTotal,
} from "../metrics/http.metrics";

export function httpMetricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  activeHttpRequests.inc();

  const start = process.hrtime.bigint();

  res.on("finish", () => {
    activeHttpRequests.dec();

    const duration = Number(process.hrtime.bigint() - start) / 1_000_000_000;

    const route = req.route?.path ?? req.baseUrl ?? req.path;

    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    };

    httpRequestsTotal.inc(labels);

    httpRequestDuration.observe(labels, duration);
  });

  next();
}
