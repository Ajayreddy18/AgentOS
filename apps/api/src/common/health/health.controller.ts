import { Request, Response } from "express";

import { HealthService } from "./health.service";

const healthService = new HealthService();

export async function getHealth(req: Request, res: Response) {
  const health = await healthService.getHealth();

  return res.status(health.status === "ok" ? 200 : 503).json(health);
}

export async function getLiveness(req: Request, res: Response) {
  const health = await healthService.getLiveness();

  return res.status(200).json(health);
}

export async function getReadiness(req: Request, res: Response) {
  const readiness = await healthService.getReadiness();

  return res.status(readiness.status === "ready" ? 200 : 503).json(readiness);
}
