import { Router } from "express";

import { chat, chatStream } from "./chat.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/conversations/:conversationId/chat", chat);

router.post("/conversations/:conversationId/chat/stream", chatStream);

export default router;
