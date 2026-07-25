import { sql } from "drizzle-orm";

import { db } from "../../db";
import { APP_INFO } from "../config/app-info";

export class HealthService {
  async getLiveness() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness() {
    let database = "down";

    try {
      await db.execute(sql`SELECT 1`);
      database = "up";
    } catch {
      database = "down";
    }

    return {
      status: database === "up" ? "ready" : "not_ready",

      services: {
        database,
      },
    };
  }

  async getHealth() {
    let database = "down";

    try {
      await db.execute(sql`SELECT 1`);
      database = "up";
    } catch {
      database = "down";
    }

    return {
      status: database === "up" ? "ok" : "degraded",

      name: APP_INFO.name,

      version: APP_INFO.version,

      environment: process.env.NODE_ENV ?? "development",

      node: process.version,

      uptime: process.uptime(),

      timestamp: new Date().toISOString(),

      services: {
        database,
      },
    };
  }
}
