import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import { isAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

router.get("/me", isAuthMiddleware, authControllers.me);

//liked
router.put("/liked/:id", isAuthMiddleware, authControllers.liked);
//profile update
router.put("/profile/update", isAuthMiddleware, authControllers.updateProfile);

router.put(
  "/password/update",
  isAuthMiddleware,
  authControllers.passwordUpdate
);

router.put("/photo/update", isAuthMiddleware, authControllers.updatePhoto);

export default router;
