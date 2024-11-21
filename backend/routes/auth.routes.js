import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import { isAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);
//liked
router.put("/liked/:id", isAuthMiddleware, authControllers.liked);
//profile update
router.put("/profile/update", isAuthMiddleware, authControllers.updateProfile);

router.put(
  "/password/update",
  isAuthMiddleware,
  authControllers.passwordUpdate
);

export default router;
