import express from "express";
import { registerUser, loginUser, verifyUserEmail, authUser, updateUserProfile, logoutUser } from "../Controllers/authController.js";
import { registerAdmin, loginAdmin, verifyAdminEmail, authAdmin } from "../Controllers/AdminController.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import upload from "../Middleware/multerMiddlewareForProFilePic.js";
const router = express.Router();

// User Signup
router.post("/signup", registerUser);

// User Login
router.post("/login", loginUser);

// User Logout
router.post("/logout", logoutUser);

// Auth User
router.get("/me", authenticateUser, authUser);

// Auth Admin
router.get("/admin/me", authenticateUser, authAdmin);

// Update User Profile
router.put("/update-profile", authenticateUser, upload.single("profilePic"), updateUserProfile)

// verify user email
router.get("/verify/user/:token", verifyUserEmail);

// User Signup
router.post("/signupAdmin", registerAdmin);

// User Login
router.post("/loginAdmin", loginAdmin);

//verify admin email
router.get("/verify/admin/:token", verifyAdminEmail);

export default router;
