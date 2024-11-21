import express from "express";
import membersControllers from "../controllers/members.controllers.js";

const router = express.Router();

router.get("/filter", membersControllers.memberFilters);

export default router;
