import { Router } from "express";

import {
  create,
  list,
  getById,
  update,
  deleteTool,
} from "./tool.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/agents/:agentId/tools", create);

router.get("/agents/:agentId/tools", list);

router.get("/agents/:agentId/tools/:toolId", getById);

router.patch("/agents/:agentId/tools/:toolId", update);

router.delete("/agents/:agentId/tools/:toolId", deleteTool);

export default router;
