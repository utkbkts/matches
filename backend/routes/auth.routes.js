import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import { isAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authControllers.register);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

router.put("/liked/:id", isAuthMiddleware, authControllers.liked);

export default router;
