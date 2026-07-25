import { Router } from "express";
import { register, login, me } from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.post(
  "/register",
  (req, res, next) => {
    next();
  },
  register,
);

router.post(
  "/login",
  (req, res, next) => {
    next();
  },
  login,
);

router.get("/me", authenticate, me);

export default router;
