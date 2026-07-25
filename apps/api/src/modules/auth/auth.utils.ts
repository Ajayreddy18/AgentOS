import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { JwtPayload } from "./auth.types";

const JWT_SECRET =
  process.env.JWT_SECRET || "development-secret-change-in-production";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  const payload = jwt.verify(token, JWT_SECRET);

  if (
    typeof payload === "string" ||
    !("id" in payload) ||
    !("email" in payload)
  ) {
    throw new Error("Invalid access token");
  }

  return {
    id: payload.id as string,
    email: payload.email as string,
  };
}
