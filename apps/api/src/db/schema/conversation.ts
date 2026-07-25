import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

import { agents } from "./agent";

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),

  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, {
      onDelete: "cascade",
    }),

  title: varchar("title", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
