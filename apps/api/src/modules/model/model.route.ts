import { Router } from "express";

import {
  create,
  list,
  getById,
  update,
  deleteModel,
} from "./model.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/agents/:agentId/models", create);

router.get("/agents/:agentId/models", list);

router.get("/agents/:agentId/models/:modelId", getById);

router.patch("/agents/:agentId/models/:modelId", update);

router.delete("/agents/:agentId/models/:modelId", deleteModel);

export default router;
