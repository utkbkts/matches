import express from "express";
import subscriptionControllers from "../controllers/subscription.controllers.js";
import { isAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/stripe",
  isAuthMiddleware,
  subscriptionControllers.subscriptionCreateStripe
);

export default router;
