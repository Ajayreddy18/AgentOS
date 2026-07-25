import { Router } from "express";

import { AuditController } from "./audit.controller";

import { authenticate } from "../auth/auth.middleware";

const router = Router();

const controller = new AuditController();

router.get(
  "/",

  authenticate,

  controller.getAuditLogs,
);

export default router;
