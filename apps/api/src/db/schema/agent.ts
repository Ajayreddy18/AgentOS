import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { environments } from "./environment";

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }).notNull(),

  description: text("description"),

  environmentId: uuid("environment_id")
    .notNull()
    .references(() => environments.id, {
      onDelete: "cascade",
    }),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
