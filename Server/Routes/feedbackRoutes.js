import express from "express";
import { submitFeedback, getAllFeedbacks } from "../Controllers/feedbackController.js";
import { authenticateUser, authorizeAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

// User submits feedback
router.post("/", authenticateUser, submitFeedback);

// Admin fetches all feedbacks
router.get("/", authenticateUser, authorizeAdmin, getAllFeedbacks);

export default router;
