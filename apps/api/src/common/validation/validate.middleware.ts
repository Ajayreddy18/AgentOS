import type { Request, Response, NextFunction } from "express";

import type { ZodError } from "zod";

import type { ValidationSchemas } from "./validation.types";

import { createValidationError } from "./validation.error";

export function validate(schemas: ValidationSchemas) {
  return (
    req: Request,

    _res: Response,

    next: NextFunction,
  ): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as Request["query"];
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Request["params"];
      }

      next();
    } catch (error) {
      next(createValidationError(error as ZodError));
    }
  };
}
