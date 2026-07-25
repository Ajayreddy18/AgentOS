import { Router } from "express";

import { authenticate } from "../auth/auth.middleware.js";

import { getRuntime } from "./runtime.controller.js";

const router = Router();

router.get("/conversations/:conversationId/runtime", authenticate, getRuntime);

export default router;
