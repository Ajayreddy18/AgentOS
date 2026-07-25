import { db } from "../../db";

import {
  organizations,
  projects,
  agents,
  conversations,
  messages,
  knowledges,
  tools,
  runtimeEvents,
} from "../../db/schema";

import { count, avg, eq, sql } from "drizzle-orm";

import type { AnalyticsOverview } from "./analytics.types";

class AnalyticsService {
  async getOverview(): Promise<AnalyticsOverview> {
    const [
      organizationsCount,
      projectsCount,
      agentsCount,
      conversationsCount,
      messagesCount,
      knowledgeCount,
      toolsCount,
    ] = await Promise.all([
      db
        .select({
          count: count(),
        })
        .from(organizations),

      db
        .select({
          count: count(),
        })
        .from(projects),

      db
        .select({
          count: count(),
        })
        .from(agents),

      db
        .select({
          count: count(),
        })
        .from(conversations),

      db
        .select({
          count: count(),
        })
        .from(messages),

      db
        .select({
          count: count(),
        })
        .from(knowledges),

      db
        .select({
          count: count(),
        })
        .from(tools),
    ]);

    const toolExecutions = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(eq(runtimeEvents.type, "tool-execution.completed"));

    const llmCalls = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(eq(runtimeEvents.type, "llm.completed"));

    const latency = await db
      .select({
        average: avg(runtimeEvents.durationMs),
      })
      .from(runtimeEvents)
      .where(sql`${runtimeEvents.durationMs} IS NOT NULL`);

    const responseLength = await db
      .select({
        average: sql<number>`
                    AVG(
                        (
                            metadata->>'responseLength'
                        )::int
                    )
                `,
      })
      .from(runtimeEvents)
      .where(eq(runtimeEvents.type, "llm.completed"));

    const runtimeEventsCount = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents);

    const successfulExecutions = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(
        sql`
                    type='tool-execution.completed'
                    AND metadata->>'success'='true'
                `,
      );

    const failedExecutions = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(
        sql`
                    type='tool-execution.completed'
                    AND metadata->>'success'='false'
                `,
      );

    const plannerRuns = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(eq(runtimeEvents.type, "planner.completed"));

    const retrievalRuns = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(eq(runtimeEvents.type, "retrieval.completed"));

    const memoryRuns = await db
      .select({
        count: count(),
      })
      .from(runtimeEvents)
      .where(eq(runtimeEvents.type, "memory.completed"));

    return {
      totalOrganizations: organizationsCount[0].count,

      totalProjects: projectsCount[0].count,

      totalAgents: agentsCount[0].count,

      totalConversations: conversationsCount[0].count,

      totalMessages: messagesCount[0].count,

      totalKnowledgeBases: knowledgeCount[0].count,

      totalTools: toolsCount[0].count,

      toolExecutions: toolExecutions[0].count,

      totalLLMCalls: llmCalls[0].count,

      averageLatencyMs: Number(latency[0].average ?? 0),

      averageResponseLength: Number(responseLength[0].average ?? 0),

      successfulToolExecutions: successfulExecutions[0].count,

      failedToolExecutions: failedExecutions[0].count,

      successRate:
        toolExecutions[0].count === 0
          ? 100
          : Number(
              (successfulExecutions[0].count / toolExecutions[0].count) * 100,
            ),

      averageMessagesPerConversation:
        conversationsCount[0].count === 0
          ? 0
          : Number(
              (messagesCount[0].count / conversationsCount[0].count).toFixed(2),
            ),

      runtimeEvents: runtimeEventsCount[0].count,

      plannerRuns: plannerRuns[0].count,

      retrievalRuns: retrievalRuns[0].count,

      memoryRuns: memoryRuns[0].count,
    };
  }
}
export const analyticsService = new AnalyticsService();
