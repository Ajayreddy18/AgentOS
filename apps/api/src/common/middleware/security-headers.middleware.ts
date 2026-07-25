import type { NextFunction, Request, Response } from "express";

export function securityHeadersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.setHeader("Cache-Control", "no-store");

  res.setHeader("Pragma", "no-cache");

  res.setHeader("Expires", "0");

  next();
}
