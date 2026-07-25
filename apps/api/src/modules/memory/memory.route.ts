import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteMemory,
} from "./memory.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/agents/:agentId/memories", create);

router.get("/agents/:agentId/memories", list);

router.get("/agents/:agentId/memories/:memoryId", getById);

router.patch("/agents/:agentId/memories/:memoryId", update);

router.delete("/agents/:agentId/memories/:memoryId", deleteMemory);

export default router;
