import { Request, Response } from "express";

import { AuditService } from "./audit.service";

import type { AuditQuery } from "./audit.types";

export class AuditController {
  private auditService = new AuditService();

  getAuditLogs = async (
    req: Request,

    res: Response,
  ) => {
    const query: AuditQuery = {
      page: Number(req.query.page ?? 1),

      limit: Number(req.query.limit ?? 20),

      search: req.query.search as string,

      severity: req.query.severity as string,

      action: req.query.action as string,

      actor: req.query.actor as string,

      resource: req.query.resource as string,

      sort: (req.query.sort as "asc" | "desc") ?? "desc",
    };

    const data = await this.auditService.getAuditLogs(query);

    return res.json({
      success: true,

      data,
    });
  };
}
