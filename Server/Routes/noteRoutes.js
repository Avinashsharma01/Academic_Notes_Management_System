import express from "express";
import { uploadNote, getNotes, deleteNote, updateNote, searchNotes } from "../controllers/noteController.js";
import { authenticateUser, authorizeAdmin } from "../Middleware/authMiddleware.js";
import upload from "../Middleware/uploadMiddleware.js"; // Import multer middleware
const router = express.Router();

// Admin uploads a note
router.post("/upload", authenticateUser, authorizeAdmin, upload.single("file"), uploadNote);

// Get all notes
router.get("/", authenticateUser, getNotes);

// Search & Filter notes (Authenticated Users)
router.get("/search", authenticateUser, searchNotes);

// Delete a note (Admin Only)
router.delete("/:id", authenticateUser, authorizeAdmin, deleteNote);

// Update a note (Admin Only)
router.put("/:id", authenticateUser, authorizeAdmin, upload.single("file"), updateNote);

export default router;
