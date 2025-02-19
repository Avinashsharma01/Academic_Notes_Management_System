import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        course: { type: String, required: true },
        branch: { type: String, required: true },
        enrollment: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        role: { type: String, enum: ["student", "admin"], default: "student" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
