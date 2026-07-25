import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteMessage,
} from "./message.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/conversations/:conversationId/messages", create);

router.get("/conversations/:conversationId/messages", list);

router.get("/conversations/:conversationId/messages/:messageId", getById);

router.patch("/conversations/:conversationId/messages/:messageId", update);

router.delete(
  "/conversations/:conversationId/messages/:messageId",
  deleteMessage,
);

export default router;
