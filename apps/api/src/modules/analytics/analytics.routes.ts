import { Router } from "express";

import { analyticsController } from "./analytics.controller";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.get("/overview", authenticate, analyticsController.overview);

export default router;
