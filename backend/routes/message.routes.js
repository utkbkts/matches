import express from "express";
import messageControllers from "../controllers/message.controllers.js";
import { isAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send/:id", isAuthMiddleware, messageControllers.sendMessage);

router.get("/:id", isAuthMiddleware, messageControllers.getMessages);

export default router;
