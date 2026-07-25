import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  customType,
} from "drizzle-orm/pg-core";

import { agents } from "./agent";

const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return "vector(1024)";
  },

  toDriver(value: number[]): string {
    return `[${value.join(",")}]`;
  },

  fromDriver(value: string): number[] {
    return value.slice(1, -1).split(",").map(Number);
  },
});

export const knowledges = pgTable("knowledges", {
  id: uuid("id").primaryKey().defaultRandom(),

  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, {
      onDelete: "cascade",
    }),

  name: varchar("name", { length: 255 }).notNull(),

  content: text("content").notNull(),

  embedding: vector("embedding"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
