import type { CorsOptions } from "cors";

import { env } from "./env";

const allowedOrigins = [
  "http://localhost:5173",

  "http://localhost:3000",

  env.FRONTEND_URL,
].filter(Boolean);

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Origin not allowed by CORS"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Authorization", "Content-Type", "X-Request-Id"],
};
