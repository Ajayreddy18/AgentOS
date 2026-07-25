import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { agents } from "./agent";

export const tools = pgTable("tools", {
  id: uuid("id").primaryKey().defaultRandom(),

  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, {
      onDelete: "cascade",
    }),

  name: varchar("name", { length: 255 }).notNull(),

  description: text("description"),

  type: varchar("type", { length: 100 }).notNull(),

  configuration: text("configuration"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
