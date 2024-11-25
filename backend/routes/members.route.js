import express from "express";
import membersControllers from "../controllers/members.controllers.js";
import { isAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/filter", membersControllers.memberFilters);

router.get("/byId", isAuthMiddleware, membersControllers.memberGetById);

export default router;
