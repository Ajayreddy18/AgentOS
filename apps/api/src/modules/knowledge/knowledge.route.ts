import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteKnowledge,
  search,
} from "./knowledge.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/agents/:agentId/knowledges", create);

router.get("/agents/:agentId/knowledges", list);

router.post("/agents/:agentId/knowledges/search", search);

router.get("/agents/:agentId/knowledges/:knowledgeId", getById);

router.patch("/agents/:agentId/knowledges/:knowledgeId", update);

router.delete("/agents/:agentId/knowledges/:knowledgeId", deleteKnowledge);

export default router;
