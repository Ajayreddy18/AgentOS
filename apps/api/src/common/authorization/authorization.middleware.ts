import type { Request, Response, NextFunction } from "express";

export function authorize() {
  return async (
    req: Request,

    _res: Response,

    next: NextFunction,
  ) => {
    try {
      next();
    } catch (error) {
      next(error);
    }
  };
}
