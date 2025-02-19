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

        res.status(200).json({ token, admin: { id: admin._id, name: admin.name, course: admin.course, branch: admin.branch, enrollment: admin.enrollment, email: admin.email, role: admin.role } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


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