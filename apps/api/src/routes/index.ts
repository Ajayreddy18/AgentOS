import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import organizationRoutes from "../modules/organization/organization.route.js";
import projectRoutes from "../modules/project/project.routes.js";
import environmentRoutes from "../modules/environment/environment.routes.js";
import agentRoutes from "../modules/agent/agent.routes.js";
import promptRoutes from "../modules/prompt/prompt.routes.js";
import memoryRoutes from "../modules/memory/memory.route.js";
import knowledgeRoutes from "../modules/knowledge/knowledge.route.js";
import modelRoutes from "../modules/model/model.route.js";
import toolRoutes from "../modules/tool/tool.routes.js";
import conversationRoutes from "../modules/conversation/conversation.route.js";
import messageRoutes from "../modules/message/message.route.js";
import chatRoutes from "../modules/chat/chat.routes.js";
import runtimeEventRoutes from "../modules/runtime-events/runtime-event.routes.js";
import analyticsRoutes from "../modules/analytics/analytics.routes.js";

const router = Router();

router.use(
  "/auth",
  (req, res, next) => {
    next();
  },
  authRoutes,
);
router.use("/organizations", organizationRoutes);
router.use("/", projectRoutes);
router.use("/", environmentRoutes);
router.use("/", agentRoutes);
router.use("/", promptRoutes);
router.use("/", memoryRoutes);
router.use("/", knowledgeRoutes);
router.use("/", modelRoutes);
router.use("/", toolRoutes);
router.use("/", conversationRoutes);
router.use("/", messageRoutes);
router.use("/", chatRoutes);
router.use("/", runtimeEventRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
