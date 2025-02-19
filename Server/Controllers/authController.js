import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/UserEmailVerification.js"
// User Signup
export const registerUser = async (req, res) => {
    try {
        const { name, course, branch, enrollment, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({ name, course, branch, enrollment, email, password: hashedPassword, role });
        await newUser.save();

        // send email 
        await sendVerificationEmail(email, newUser._id)

        res.status(201).json({
            message:
                "Registration successful! Please check your email for verification.",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        if (!user.isVerified) {
            return res.status(404).json({ message: "user not found !" })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ token, user: { id: user._id, name: user.name, course: user.course, branch: user.branch, enrollment: user.enrollment, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const verifyUserEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: "User not found!" });

        if (user.isVerified)
            return res.status(400).json({ message: "Email already verified!" });

        // Mark user as verified
        user.isVerified = true;
        await user.save();

        res.status(200).render('UserEmailVerify')
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token!" });
    }
};