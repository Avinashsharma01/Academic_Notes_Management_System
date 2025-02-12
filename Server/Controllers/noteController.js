import Note from "../Models/Note.js";
import cloudinary from "../Config/cloudinary.js"
// Upload a Note (Admin only)
export const uploadNote = async (req, res) => {
    // console.log("uploadNote", req);
    try {
        const { title, description, fileUrl, session, course, branch, semester, subject } = req.body;

        // Ensure all required fields are provided
        if (!title || !description || !course || !branch || !semester || !session || !subject) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        // Create a new note with Cloudinary file URL
        const newNote = new Note({
            title,
            description,
            fileUrl: req.file.path, // Cloudinary URL
            uploadedBy: req.user.id, // Admin ID from JWT
            session,
            course,
            branch,
            semester,
            subject,
        });

        await newNote.save();
        res.status(201).json({ message: "Note uploaded successfully!", note: newNote });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate("uploadedBy", "name email"); // Populate admin details
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete Note (Admin Only)
export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        // Find note by ID
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Extract the public_id from the Cloudinary URL
        const fileUrl = note.fileUrl;
        const publicId = fileUrl.split("/").pop().split(".")[0]; // Extract public_id from URL

        // Delete file from Cloudinary
        await cloudinary.uploader.destroy(`notes/${publicId}`);

        // Delete note from database
        await Note.findByIdAndDelete(noteId);

        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Update Note (Admin Only)
export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, description } = req.body;

        // Find note by ID
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Update fields
        note.title = title || note.title;
        note.description = description || note.description;

        // If a new file is uploaded, replace the old one
        if (req.file) {
            // Extract the public_id from the Cloudinary URL
            const oldFileUrl = note.fileUrl;
            const publicId = oldFileUrl.split("/").pop().split(".")[0];

            // Delete old file from Cloudinary
            await cloudinary.uploader.destroy(`notes/${publicId}`);

            // Upload new file to Cloudinary
            const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "notes",
            });

            note.fileUrl = uploadedFile.secure_url;
        }

        // Save updated note
        await note.save();

        res.status(200).json({ message: "Note updated successfully!", note });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



// // Search & Filter Notes
export const searchNotes = async (req, res) => {
    try {
        const { query, subject } = req.query;

        let filter = {};

        // Case-insensitive title/description search
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ];
        }

        // Case-insensitive subject search
        if (subject) {
            filter.subject = { $regex: `^${subject}$`, $options: "i" };
        }

        const notes = await Note.find(filter);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// // Search & Filter Notes
// export const searchNotes = async (req, res) => {
//     try {
//         const { query, subject } = req.query;

//         let filter = {};

//         // Filter by title or description (case-insensitive)
//         if (query) {
//             filter.$or = [
//                 { title: { $regex: query, $options: "i" } },
//                 { description: { $regex: query, $options: "i" } }
//             ];
//         }

//         // Filter by subject
//         if (subject) {
//             filter.subject = subject;
//         }

//         const notes = await Note.find(filter);

//         res.status(200).json(notes);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };
