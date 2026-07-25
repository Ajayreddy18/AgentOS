import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./user";

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }).notNull(),

  slug: varchar("slug", { length: 255 }).notNull().unique(),

  description: text("description"),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
