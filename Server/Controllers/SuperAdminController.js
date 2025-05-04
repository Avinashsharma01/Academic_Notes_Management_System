import SuperAdmin from "../Models/SuperAdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/SuperAdminEmailVerification.js";


// SuperAdmin Signup
export const registerSuperAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if SuperAdmin already exists
        const existingSuperAdmin = await SuperAdmin.findOne({ email });
        if (existingSuperAdmin) return res.status(400).json({ message: "SuperAdmin already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create SuperAdmin
        const newSuperAdmin = new SuperAdmin({ name, email, password: hashedPassword });
        await newSuperAdmin.save();

        await sendVerificationEmail(email, newSuperAdmin._id)

        res.status(201).json({
            message:
                "Registration successful! Please check your email for verification.",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//
// SuperAdmin Login
export const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if SuperAdmin exists
        const superAdmin = await SuperAdmin.findOne({ email });

        if (!superAdmin) return res.status(400).json({ message: "Invalid email or password" });

        if (!superAdmin.isVerified) {
            return res.status(404).json({ message: "SuperAdmin not found!" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ id: superAdmin._id, role: superAdmin.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Set JWT as cookie
        res.cookie("SuperauthToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        }).status(200).json({
            message: "Login successful",
            token,
            superAdmin,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//

// SuperAdmin Logout
export const logoutSuperAdmin = async (req, res) => {
    try {
        res.clearCookie("SuperauthToken").status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//

// Verify SuperAdmin Email
export const verifySuperAdminEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(400).json({ message: "Invalid or expired token" });

        // Update SuperAdmin's isVerified status
        await SuperAdmin.findByIdAndUpdate(decoded.id, { isVerified: true });

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Resend Verification Email
export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if SuperAdmin exists
        const superAdmin = await SuperAdmin.findOne({ email });
        if (!superAdmin) return res.status(400).json({ message: "SuperAdmin not found" });

        // Send verification email
        await sendVerificationEmail(email, superAdmin._id);

        res.status(200).json({ message: "Verification email resent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Get SuperAdmin Profile
export const getSuperAdminProfile = async (req, res) => {
    try {
        const superAdmin = await SuperAdmin.findById(req.superAdmin.id).select("-password -__v");
        if (!superAdmin) return res.status(404).json({ message: "SuperAdmin not found" });

        res.status(200).json(superAdmin);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//

// Update SuperAdmin Profile
export const updateSuperAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if SuperAdmin exists
        const superAdmin = await SuperAdmin.findById(req.superAdmin.id);
        if (!superAdmin) return res.status(404).json({ message: "SuperAdmin not found" });

        // Update SuperAdmin profile
        superAdmin.name = name || superAdmin.name;
        superAdmin.email = email || superAdmin.email;
        await superAdmin.save();

        res.status(200).json({ message: "Profile updated successfully", superAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//

