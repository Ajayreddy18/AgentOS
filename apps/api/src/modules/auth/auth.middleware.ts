import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "./auth.types";
import { RequestContextService } from "../../common/context/request-context";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }
  const [, token] = authHeader.split(" ");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    RequestContextService.set({
      userId: decoded.id,
    });

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error,
    });
  }
}
