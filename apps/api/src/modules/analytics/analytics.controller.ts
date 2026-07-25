import { Request, Response } from "express";

import { analyticsService } from "./analytics.service";

class AnalyticsController {
  async overview(req: Request, res: Response) {
    const data = await analyticsService.getOverview();

    return res.json({
      success: true,

      data,
    });
  }
}

export const analyticsController = new AnalyticsController();
