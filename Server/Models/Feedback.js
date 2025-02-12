import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1 to 5 stars)
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
