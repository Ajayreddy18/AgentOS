import { Router } from "express";

import { authenticate } from "../auth/auth.middleware";

import { dashboard } from "./metrics.controller";

const router = Router();

router.use(authenticate);

router.get("/dashboard", dashboard);

export default router;
