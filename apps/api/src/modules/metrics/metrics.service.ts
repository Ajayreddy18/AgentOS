import { count, eq, sql } from "drizzle-orm";

import { db } from "../../db";

import {
  organizations,
  projects,
  environments,
  agents,
  conversations,
  messages,
} from "../../db/schema";

import type { DashboardMetrics } from "./metrics.types";

export class MetricsService {
  async getDashboard(ownerId: string): Promise<DashboardMetrics> {
    const [
      organizationCount,
      projectCount,
      environmentCount,
      agentCount,
      conversationCount,
      messageCount,
    ] = await Promise.all([
      db
        .select({
          value: count(),
        })
        .from(organizations)
        .where(eq(organizations.ownerId, ownerId)),

      db
        .select({
          value: count(),
        })
        .from(projects)
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(eq(organizations.ownerId, ownerId)),

      db
        .select({
          value: count(),
        })
        .from(environments)
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(eq(organizations.ownerId, ownerId)),

      db
        .select({
          value: count(),
        })
        .from(agents)
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(eq(organizations.ownerId, ownerId)),

      db
        .select({
          value: count(),
        })
        .from(conversations)
        .innerJoin(agents, eq(conversations.agentId, agents.id))
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(eq(organizations.ownerId, ownerId)),

      db
        .select({
          value: count(),
        })
        .from(messages)
        .innerJoin(conversations, eq(messages.conversationId, conversations.id))
        .innerJoin(agents, eq(conversations.agentId, agents.id))
        .innerJoin(environments, eq(agents.environmentId, environments.id))
        .innerJoin(projects, eq(environments.projectId, projects.id))
        .innerJoin(organizations, eq(projects.organizationId, organizations.id))
        .where(eq(organizations.ownerId, ownerId)),
    ]);

    const dailyMessages = await db
      .select({
        date: sql<string>`
                        DATE(${messages.createdAt})
                        `,

        count: count(),
      })

      .from(messages)

      .groupBy(
        sql`
                    DATE(${messages.createdAt})
                    `,
      )

      .orderBy(
        sql`
                    DATE(${messages.createdAt})
                    `,
      );

    const dailyConversations = await db
      .select({
        date: sql<string>`
                        DATE(${conversations.createdAt})
                        `,

        count: count(),
      })

      .from(conversations)

      .groupBy(
        sql`
                    DATE(${conversations.createdAt})
                    `,
      )

      .orderBy(
        sql`
                    DATE(${conversations.createdAt})
                    `,
      );

    const agentUsage = await db
      .select({
        agentId: agents.id,

        agentName: agents.name,

        messages: count(messages.id),
      })

      .from(agents)

      .leftJoin(conversations, eq(agents.id, conversations.agentId))

      .leftJoin(messages, eq(conversations.id, messages.conversationId))

      .groupBy(agents.id, agents.name);

    return {
      summary: {
        organizations: organizationCount[0].value,

        projects: projectCount[0].value,

        environments: environmentCount[0].value,

        agents: agentCount[0].value,

        conversations: conversationCount[0].value,

        messages: messageCount[0].value,
      },

      activity: {
        messages: dailyMessages,

        conversations: dailyConversations,
      },

      agents: agentUsage.map((agent) => ({
        agentId: agent.agentId,

        agentName: agent.agentName,

        messages: agent.messages,

        conversations: 0,
      })),
    };
  }
}
