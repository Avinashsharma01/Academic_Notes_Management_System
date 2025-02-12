import express from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";
import { registerAdmin, loginAdmin } from "../Controllers/AdminController.js";

const router = express.Router();

// User Signup
router.post("/signup", registerUser);

// User Login
router.post("/login", loginUser);


// User Signup
router.post("/signupAdmin", registerAdmin);

// User Login
router.post("/loginAdmin", loginAdmin);




export default router;
