import { Request, Response } from "express";

import { AppError } from "../errors/app-error";
import { logger } from "../logger/logger";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";

export function errorMiddleware(error: unknown, req: Request, res: Response) {
  if (error instanceof TokenExpiredError) {
    return res.status(401).json({
      success: false,

      error: {
        code: "TOKEN_EXPIRED",

        message: error.message,
      },

      requestId: req.requestId,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,

      error: {
        code: "INVALID_TOKEN",

        message: error.message,
      },

      requestId: req.requestId,
    });
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },

      requestId: req.requestId,
    });
  }

  logger.error(
    {
      err: error,
    },
    "Unhandled application error",
  );

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues,
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    },

    requestId: req.requestId,
  });
}
