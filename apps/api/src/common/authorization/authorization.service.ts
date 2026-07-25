import { and, eq } from "drizzle-orm";

import { db } from "../../db";

import { organizations } from "../../db/schema/organization";
import { projects } from "../../db/schema/project";
import { environments } from "../../db/schema/environment";
import { agents } from "../../db/schema/agent";
import { conversations } from "../../db/schema/conversation";

import { AuthorizationError } from "../errors/authorization-error";

export class AuthorizationService {
  async assertConversationAccess(
    ownerId: string,
    conversationId: string,
  ): Promise<void> {
    const result = await db
      .select({
        id: conversations.id,
      })
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
      );

    if (result.length === 0) {
      throw new AuthorizationError("Access denied");
    }
  }
}
