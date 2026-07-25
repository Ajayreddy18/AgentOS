import { and, asc, count, desc, eq, ilike } from "drizzle-orm";

import { db } from "../../db";

import { messages } from "../../db/schema";

import type { AuditListResponse, AuditLog, AuditQuery } from "./audit.types";

export class AuditService {
  async getAuditLogs(query: AuditQuery): Promise<AuditListResponse<AuditLog>> {
    const {
      page,

      limit,

      search,

      action,

      resource,

      sort,
    } = query;

    const filters = [];

    if (search) {
      filters.push(ilike(messages.role, `%${search}%`));
    }

    if (action) {
      filters.push(eq(messages.role, action));
    }

    if (resource) {
      filters.push(eq(messages.role, resource));
    }

    const whereClause = filters.length ? and(...filters) : undefined;

    const items = await db

      .select({
        id: messages.id,

        action: messages.role,

        resource: messages.role,

        userId: messages.conversationId,

        createdAt: messages.createdAt,
      })

      .from(messages)

      .where(whereClause)

      .orderBy(
        sort === "asc" ? asc(messages.createdAt) : desc(messages.createdAt),
      )

      .limit(limit)

      .offset((page - 1) * limit);

    const totalResult = await db

      .select({
        count: count(),
      })

      .from(messages)

      .where(whereClause);

    const total = Number(totalResult[0].count);

    return {
      items,

      page,

      limit,

      total,

      totalPages: Math.ceil(total / limit),
    };
  }
}
