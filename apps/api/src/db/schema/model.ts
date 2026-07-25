import {
  pgTable,
  uuid,
  varchar,
  integer,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

import { agents } from "./agent";

export const models = pgTable("models", {
  id: uuid("id").primaryKey().defaultRandom(),

  agentId: uuid("agent_id")
    .notNull()
    .references(() => agents.id, {
      onDelete: "cascade",
    }),

  provider: varchar("provider", { length: 100 }).notNull(),

  modelName: varchar("model_name", { length: 255 }).notNull(),

  temperature: real("temperature").notNull().default(0.7),

  maxTokens: integer("max_tokens").notNull().default(4096),

  topP: real("top_p").notNull().default(1),

  frequencyPenalty: real("frequency_penalty").notNull().default(0),

  presencePenalty: real("presence_penalty").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
