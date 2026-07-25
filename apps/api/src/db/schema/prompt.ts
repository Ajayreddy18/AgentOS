import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { agents } from "./agent";

export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),

  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, {
      onDelete: "cascade",
    }),

  name: varchar("name", { length: 255 }).notNull(),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
