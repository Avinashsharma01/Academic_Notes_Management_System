import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        fileUrl: { type: String, required: true }, // URL of the uploaded file
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'uploaderModel', // Dynamic reference based on the uploaderModel field
            required: true
        },
        uploaderModel: {
            type: String,
            required: true,
            enum: ['User', 'Admin'] // Either a User or Admin reference
        },
        session: { type: String, required: true },
        course: { type: String, required: true },
        branch: { type: String, required: true },
        semester: { type: String, required: true },
        subject: { type: String, required: true },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
