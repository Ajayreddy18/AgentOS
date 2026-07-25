import { eq, and, asc } from "drizzle-orm";

import { db } from "../../db";
import { environments } from "../../db/schema/environment";
import { projects } from "../../db/schema/project";
import { organizations } from "../../db/schema/organization";
import { agents } from "../../db/schema/agent";

import { conversations } from "../../db/schema/conversation";

import type {
  CreateMessageInput,
  UpdateMessageInput,
} from "./message.validation";

import type { MessageResponse } from "./message.types";
import { messages } from "../../db/schema/message";
import { NotFoundError } from "../../common/errors/not-found-error";

export class MessageService {
  private async verifyConversationOwnership(
    ownerId: string,
    conversationId: string,
  ) {
    const agent = (
      await db
        .select()
        .from(conversations)
        .innerJoin(agents, eq(conversations.agentId, agents.id))
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(
          and(
            eq(conversations.id, conversationId),
            eq(organizations.ownerId, ownerId),
          ),
        )
    )[0];

    if (!agent) {
      throw new NotFoundError("Conversation not found");
    }

    return agent;
  }
  async create(
    ownerId: string,
    conversationId: string,
    data: CreateMessageInput,
  ): Promise<MessageResponse> {
    await this.verifyConversationOwnership(ownerId, conversationId);

    const insertedMessage = await db
      .insert(messages)
      .values({
        role: data.role,
        content: data.content,
        conversationId,
      })
      .returning();

    const message = insertedMessage[0];

    return {
      id: message.id,
      role: message.role,
      content: message.content,
      conversationId: message.conversationId,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    };
  }

  async list(
    ownerId: string,
    conversationId: string,
  ): Promise<MessageResponse[]> {
    await this.verifyConversationOwnership(ownerId, conversationId);
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));
  }

  async getById(
    ownerId: string,
    conversationId: string,
    messageId: string,
  ): Promise<MessageResponse> {
    await this.verifyConversationOwnership(ownerId, conversationId);
    const message = (
      await db
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.id, messageId),
            eq(messages.conversationId, conversationId),
          ),
        )
    )[0];
    if (!message) {
      throw new NotFoundError("Message not found");
    }

    return message;
  }

  async update(
    ownerId: string,
    conversationId: string,
    messageId: string,
    data: UpdateMessageInput,
  ): Promise<MessageResponse> {
    await this.verifyConversationOwnership(ownerId, conversationId);
    const existingMessage = (
      await db
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.id, messageId),
            eq(messages.conversationId, conversationId),
          ),
        )
    )[0];

    if (!existingMessage) {
      throw new NotFoundError("Message not found");
    }
    const updatedMessage = await db
      .update(messages)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(messages.id, messageId),
          eq(messages.conversationId, conversationId),
        ),
      )
      .returning();

    return updatedMessage[0];
  }
  async delete(
    ownerId: string,
    conversationId: string,
    messageId: string,
  ): Promise<void> {
    await this.verifyConversationOwnership(ownerId, conversationId);

    const existingMessage = (
      await db
        .select()
        .from(messages)
        .where(
          and(
            eq(messages.id, messageId),
            eq(messages.conversationId, conversationId),
          ),
        )
    )[0];

    if (!existingMessage) {
      throw new NotFoundError("Message not found");
    }

    await db
      .delete(messages)
      .where(
        and(
          eq(messages.id, messageId),
          eq(messages.conversationId, conversationId),
        ),
      );
  }

  async getConversationHistory(
    ownerId: string,
    conversationId: string,
  ): Promise<MessageResponse[]> {
    await this.verifyConversationOwnership(ownerId, conversationId);

    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));
  }
}
