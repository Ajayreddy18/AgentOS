import { Router } from "express";
import {
  create,
  list,
  getById,
  update,
  deleteOrganization,
} from "./organization.controller.js";

import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", create);
router.get("/", list);
router.get("/:id", getById);
router.patch("/:id", update);
router.delete("/:id", deleteOrganization);

export default router;
