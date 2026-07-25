import { Router } from "express";

import { authenticate } from "../auth/auth.middleware";

import { list } from "./runtime-event.controller";

const router = Router();

router.use(authenticate);

router.get("/conversations/:conversationId/runtime-events", list);

export default router;
