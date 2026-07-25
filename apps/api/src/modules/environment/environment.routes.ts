import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteEnvironment,
} from "./environment.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/projects/:projectId/environments", create);

router.get("/projects/:projectId/environments", list);

router.get("/projects/:projectId/environments/:environmentId", getById);

router.patch("/projects/:projectId/environments/:environmentId", update);

router.delete(
  "/projects/:projectId/environments/:environmentId",
  deleteEnvironment,
);

export default router;
