import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deletePrompt,
} from "./prompt.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/agents/:agentId/prompts", create);

router.get("/agents/:agentId/prompts", list);

router.get("/agents/:agentId/prompts/:promptId", getById);

router.patch("/agents/:agentId/prompts/:promptId", update);

router.delete("/agents/:agentId/prompts/:promptId", deletePrompt);

export default router;
