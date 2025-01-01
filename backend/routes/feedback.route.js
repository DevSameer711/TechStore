// routes/feedbackRoutes.js
import express from "express";
import saveFeedback from "../controllers/feedback.controller.js";

const router = express.Router();

// POST request to save feedback
router.post("/", saveFeedback);

export default router;
