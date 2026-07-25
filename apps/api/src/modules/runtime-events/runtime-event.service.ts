import { db } from "../../db";
import { eq } from "drizzle-orm";

import { runtimeEvents } from "../../db/schema/runtime-event";

export class RuntimeEventService {
  async create(input: {
    conversationId: string;
    type: string;
    metadata?: unknown;
    durationMs?: number;
  }) {
    await db.insert(runtimeEvents).values({
      conversationId: input.conversationId,

      type: input.type,

      metadata: input.metadata,

      durationMs: input.durationMs,
    });
  }

  async list(ownerId: string, conversationId: string) {
    return await db
      .select()
      .from(runtimeEvents)
      .where(eq(runtimeEvents.conversationId, conversationId));
  }
}
