import express from "express";
import { registerUser, loginUser, verifyUserEmail } from "../Controllers/authController.js";
import { registerAdmin, loginAdmin, verifyAdminEmail } from "../Controllers/AdminController.js";

const router = express.Router();

// User Signup
router.post("/signup", registerUser);

// User Login
router.post("/login", loginUser);

// verify user email
router.get("/verify/user/:token", verifyUserEmail);


// User Signup
router.post("/signupAdmin", registerAdmin);

// User Login
router.post("/loginAdmin", loginAdmin);

//verify admin email
router.get("/verify/admin/:token", verifyAdminEmail);




export default router;
