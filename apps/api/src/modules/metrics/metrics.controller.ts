import { Request, Response } from "express";

import { MetricsService } from "./metrics.service";

const metricsService = new MetricsService();

export async function dashboard(req: Request, res: Response) {
  const ownerId = req.user.id;

  const metrics = await metricsService.getDashboard(ownerId);

  return res.json({
    success: true,

    data: metrics,
  });
}
