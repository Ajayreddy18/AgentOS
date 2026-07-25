import type { Request, Response, NextFunction } from "express";

import { extractBearerToken } from "./extract-token";

import { verifyAccessToken } from "../../modules/auth/auth.utils";

export function authMiddleware(
  req: Request,

  _res: Response,

  next: NextFunction,
): void {
  const token = extractBearerToken(req);

  const payload = verifyAccessToken(token);

  req.user = payload;

  next();
}
