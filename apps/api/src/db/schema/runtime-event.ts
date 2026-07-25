import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { conversations } from "./conversation";

export const runtimeEvents = pgTable("runtime_events", {
  id: uuid("id").defaultRandom().primaryKey(),

  conversationId: uuid("conversation_id")
    .references(() => conversations.id, {
      onDelete: "cascade",
    })
    .notNull(),

  type: varchar("type", {
    length: 100,
  }).notNull(),

  metadata: jsonb("metadata"),

  durationMs: integer("duration_ms"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
