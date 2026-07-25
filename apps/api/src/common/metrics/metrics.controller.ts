import { Request, Response } from "express";

import { MetricsService } from "./metrics.service";

const metricsService = new MetricsService();

export async function getMetrics(req: Request, res: Response) {
  res.setHeader("Content-Type", metricsService.getContentType());

  res.end(await metricsService.getMetrics());
}
