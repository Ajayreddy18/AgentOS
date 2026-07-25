import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteAgent,
} from "./agent.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/environments/:environmentId/agents", create);

router.get("/environments/:environmentId/agents", list);

router.get("/environments/:environmentId/agents/:agentId", getById);

router.patch("/environments/:environmentId/agents/:agentId", update);

router.delete("/environments/:environmentId/agents/:agentId", deleteAgent);

export default router;
