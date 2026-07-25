import { eq, and } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";

import { conversations } from "../../db/schema/conversation";

import type {
  CreateConversationInput,
  UpdateConversationInput,
} from "./conversation.validation";

import type { ConversationResponse } from "./conversation.types";
import { NotFoundError } from "../../common/errors/not-found-error";

export class ConversationService {
  private async verifyAgentOwnership(ownerId: string, agentId: string) {
    const agent = (
      await db
        .select()
        .from(agents)
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(and(eq(agents.id, agentId), eq(organizations.ownerId, ownerId)))
    )[0];

    if (!agent) {
      throw new NotFoundError("Agent not found");
    }

    return agent;
  }
  async create(
    ownerId: string,
    agentId: string,
    data: CreateConversationInput,
  ): Promise<ConversationResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const insertedConversation = await db
      .insert(conversations)
      .values({
        title: data.title,
        agentId,
      })
      .returning();

    const conversation = insertedConversation[0];

    return {
      id: conversation.id,
      title: conversation.title,
      agentId: conversation.agentId,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }

  async list(
    ownerId: string,
    agentId: string,
  ): Promise<ConversationResponse[]> {
    await this.verifyAgentOwnership(ownerId, agentId);
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.agentId, agentId));
  }

  async getById(
    ownerId: string,
    agentId: string,
    conversationId: string,
  ): Promise<ConversationResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const conversation = (
      await db
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            eq(conversations.agentId, agentId),
          ),
        )
    )[0];
    if (!conversation) {
      throw new NotFoundError("Conversation not found");
    }

    return conversation;
  }

  async update(
    ownerId: string,
    agentId: string,
    conversationId: string,
    data: UpdateConversationInput,
  ): Promise<ConversationResponse> {
    await this.verifyAgentOwnership(ownerId, agentId);
    const existingConversation = (
      await db
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            eq(conversations.agentId, agentId),
          ),
        )
    )[0];

    if (!existingConversation) {
      throw new NotFoundError("Conversation not found");
    }
    const updatedConversation = await db
      .update(conversations)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(conversations.id, conversationId),
          eq(conversations.agentId, agentId),
        ),
      )
      .returning();

    return updatedConversation[0];
  }
  async delete(
    ownerId: string,
    agentId: string,
    conversationId: string,
  ): Promise<void> {
    await this.verifyAgentOwnership(ownerId, agentId);

    const existingConversation = (
      await db
        .select()
        .from(conversations)
        .where(
          and(
            eq(conversations.id, conversationId),
            eq(conversations.agentId, agentId),
          ),
        )
    )[0];

    if (!existingConversation) {
      throw new NotFoundError("Conversation not found");
    }

    await db
      .delete(conversations)
      .where(
        and(
          eq(conversations.id, conversationId),
          eq(conversations.agentId, agentId),
        ),
      );
  }
}
