import { eq } from "drizzle-orm";

import { db } from "../../db";

import { conversations } from "../../db/schema/conversation";
import { prompts } from "../../db/schema/prompt";
import { memories } from "../../db/schema/memory";
import { knowledges } from "../../db/schema/knowledge";
import { models } from "../../db/schema/model";
import { tools } from "../../db/schema/tool";

import { AuthorizationService } from "../../common/authorization";
import { CacheService } from "../../common/cache/cache.service";

import type { AgentRuntime } from "./runtime.types";
import { NotFoundError } from "../../common/errors/not-found-error";

const cacheService = new CacheService();
const authorizationService = new AuthorizationService();

export class RuntimeService {
  private getCacheKey(conversationId: string): string {
    return `runtime:${conversationId}`;
  }

  async load(ownerId: string, conversationId: string): Promise<AgentRuntime> {
    console.log("========== Runtime Load Started ==========");
    console.log({
      ownerId,
      conversationId,
    });

    return cacheService.getOrSet(
      this.getCacheKey(conversationId),

      async () => {
        await authorizationService.assertConversationAccess(
          ownerId,
          conversationId,
        );

        console.log("Authorization Passed");

        const conversationRecord = (
          await db
            .select({
              agentId: conversations.agentId,
            })
            .from(conversations)

            .where(eq(conversations.id, conversationId))
        )[0];

        console.log("Conversation Record:");
        console.log(conversationRecord);

        if (!conversationRecord) {
          throw new NotFoundError("Conversation Record not found");
        }

        const agentId = conversationRecord.agentId;

        const prompt = (
          await db.select().from(prompts).where(eq(prompts.agentId, agentId))
        )[0];

        console.log("Prompt:");
        console.log(prompt);

        const memoryList = await db
          .select()
          .from(memories)
          .where(eq(memories.agentId, agentId));

        const knowledgeList = await db
          .select()
          .from(knowledges)
          .where(eq(knowledges.agentId, agentId));

        const model = (
          await db.select().from(models).where(eq(models.agentId, agentId))
        )[0];

        console.log("Model:");
        console.log(model);

        const toolList = await db
          .select()
          .from(tools)
          .where(eq(tools.agentId, agentId));

        if (!prompt) {
          throw new NotFoundError("Prompt not configured");
        }

        if (!model) {
          throw new NotFoundError("Model not configured");
        }

        console.log("Runtime Loaded Successfully");

        return {
          agentId,

          prompt: prompt.content,

          memories: memoryList,

          knowledge: knowledgeList,

          model: {
            provider: model.provider,
            modelName: model.modelName,
            temperature: model.temperature,
            maxTokens: model.maxTokens,
            topP: model.topP,
            frequencyPenalty: model.frequencyPenalty,
            presencePenalty: model.presencePenalty,
          },

          tools: toolList,
        };
      },

      {
        ttlMs: 5 * 60 * 1000,
      },
    );
  }

  async invalidate(conversationId: string): Promise<void> {
    await cacheService.deleteRuntime(conversationId);
  }
}
