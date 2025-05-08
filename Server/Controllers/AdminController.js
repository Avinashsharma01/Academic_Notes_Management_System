import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/AdminEmailVerification.js"

// Admin Signup
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if Admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create Admin
        const newAdmin = new Admin({ name, email, password: hashedPassword, role });
        await newAdmin.save();

        await sendVerificationEmail(email, newAdmin._id)

        res.status(201).json({
            message:
                "Registration successful! Please check your email for verification.",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if Admin exists
        const admin = await Admin.findOne({ email });

        if (!admin) return res.status(400).json({ message: "Invalid email or password" });

        if (!admin.isVerified) {
            return res.status(404).json({ message: "admin not found!" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Set JWT as cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // secure in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Admin Logout
export const logoutAdmin = async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("authToken");

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// fetch the logged admin
export const authAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select("-password"); // Exclude password
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        res.status(200).json({ admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// update admin profile
export const updateAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const adminId = req.user.id;

        // Check if Admin exists
        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Update Admin profile
        admin.name = name || admin.name;
        admin.email = email || admin.email;

        await admin.save();

        res.status(200).json({ message: "Profile updated successfully", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// update admin profile image
export const updateAdminProfileImage = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { image } = req.body;

        // Check if Admin exists
        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Update Admin profile image
        admin.image = image || admin.image;

        await admin.save();

        res.status(200).json({ message: "Profile image updated successfully", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// update admin password
export const updateAdminPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const adminId = req.user.id;

        // Check if Admin exists
        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid old password" });

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



// Admin Email Verification
export const verifyAdminEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id);

        if (!admin) return res.status(404).json({ message: "Admin not found!" });

        if (admin.isVerified)
            return res.status(400).json({ message: "Email already verified!" });

        // Mark admin as verified
        admin.isVerified = true;
        await admin.save();

        res.status(200).render('AdminEmailVerify')
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};