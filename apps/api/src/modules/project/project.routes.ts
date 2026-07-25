import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteProject,
} from "./project.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/organizations/:organizationId/projects", create);

router.get("/organizations/:organizationId/projects", list);

router.get("/organizations/:organizationId/projects/:projectId", getById);

router.patch("/organizations/:organizationId/projects/:projectId", update);

router.delete(
  "/organizations/:organizationId/projects/:projectId",
  deleteProject,
);

export default router;
