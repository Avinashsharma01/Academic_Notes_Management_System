import express from "express";
import { registerUser, loginUser, verifyUserEmail, authUser, updateUserProfile } from "../Controllers/authController.js";
import { registerAdmin, loginAdmin, verifyAdminEmail } from "../Controllers/AdminController.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import upload from "../Middleware/multerMiddlewareForProFilePic.js";
const router = express.Router();

// User Signup
router.post("/signup", registerUser);

// User Login
router.post("/login", loginUser);

// Auth User
router.get("/me", authenticateUser, authUser)

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
