import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

        res.status(201).json({ message: "Admin registered successfully!" });
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
