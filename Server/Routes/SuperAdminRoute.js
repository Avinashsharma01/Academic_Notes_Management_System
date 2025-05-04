import express from "express";
import {
    registerSuperAdmin,
    loginSuperAdmin,
    logoutSuperAdmin,
    verifySuperAdminEmail,
    resendVerificationEmail,
    getSuperAdminProfile,
    updateSuperAdminProfile
} from "../Controllers/SuperAdminController.js";
import { authenticateSuperAdmin } from "../Middleware/SuperAdminMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerSuperAdmin);
router.post("/login", loginSuperAdmin);
router.get("/logout", logoutSuperAdmin);
router.get("/verify/:token", verifySuperAdminEmail);
router.post("/resend-verification", resendVerificationEmail);

// Protected routes
router.get("/profile", authenticateSuperAdmin, getSuperAdminProfile);
router.put("/profile", authenticateSuperAdmin, updateSuperAdminProfile);

export default router;
