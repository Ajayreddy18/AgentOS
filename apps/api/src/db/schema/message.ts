import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { conversations } from "./conversation";

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),

  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, {
      onDelete: "cascade",
    }),

  role: varchar("role", { length: 50 }).notNull(),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
