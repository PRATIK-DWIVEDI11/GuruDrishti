import express from "express";
import { analyzeAppraisal } from "../controllers/appraisal.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/analyze-appraisal
router.post("/analyze-appraisal", protectRoute, analyzeAppraisal);

export default router;