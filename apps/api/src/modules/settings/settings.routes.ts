import { Router } from "express";

import { authenticate } from "../auth/auth.middleware";

import { SettingsController } from "./settings.controller";

const router = Router();

const controller = new SettingsController();

router.get(
  "/",

  authenticate,

  controller.getSettings,
);

router.patch(
  "/profile",

  authenticate,

  controller.updateProfile,
);

router.patch(
  "/preferences",

  authenticate,

  controller.updatePreferences,
);

router.patch(
  "/password",

  authenticate,

  controller.changePassword,
);

export default router;
