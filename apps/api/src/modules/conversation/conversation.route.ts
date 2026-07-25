import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteConversation,
} from "./conversation.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/agents/:agentId/conversations", create);

router.get("/agents/:agentId/conversations", list);

router.get("/agents/:agentId/conversations/:conversationId", getById);

router.patch("/agents/:agentId/conversations/:conversationId", update);

router.delete(
  "/agents/:agentId/conversations/:conversationId",
  deleteConversation,
);

export default router;
