import type { NextFunction, Request, Response } from "express";

import { RequestContextService } from "../context/request-context";

export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  RequestContextService.run(
    {
      requestId: req.requestId,
    },
    () => next(),
  );
}
