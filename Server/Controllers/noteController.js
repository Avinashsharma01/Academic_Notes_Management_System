import Note from "../Models/Note.js";
import Admin from "../Models/AdminModel.js";
import Course from "../Models/CourseModel.js";
import Branch from "../Models/BranchModel.js";
import Semester from "../Models/SemesterModel.js";
import Subject from "../Models/SubjectModel.js";
import User from "../Models/UserModel.js";
import Feedback from "../Models/Feedback.js";
import cloudinary from "../Config/cloudinary.js"
// Upload a Note (Admin only)
export const uploadNote = async (req, res) => {
    // console.log("uploadNote", req);
    try {
        const { title, description, session, course, branch, semester, subject } = req.body;

        // Ensure all required fields are provided
        if (!title || !description || !course || !semester || !session || !subject) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure a file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        const admin = await Admin.findById(req.user.id).select("course department");
        if (!admin) {
            return res.status(403).json({ message: "Admin not found" });
        }

        if ((course || "").toLowerCase() !== (admin.course || "").toLowerCase()) {
            return res.status(403).json({ message: "You can upload notes only for your assigned course" });
        }

        const courseDoc = await Course.findOne({ name: { $regex: `^${admin.course}$`, $options: "i" }, isActive: true });
        if (!courseDoc) {
            return res.status(400).json({ message: "Assigned course is not active" });
        }

        let semesterDoc = await Semester.findOne({ name: { $regex: `^${semester}$`, $options: "i" }, course: courseDoc._id, isActive: true });
        if (!semesterDoc) {
            const semesterNumber = Number(String(semester).replace(/[^0-9]/g, ""));
            if (!Number.isNaN(semesterNumber) && semesterNumber > 0) {
                semesterDoc = await Semester.findOne({ number: semesterNumber, course: courseDoc._id, isActive: true });
            }
        }

        if (!semesterDoc) {
            return res.status(400).json({ message: "Invalid semester for selected course" });
        }

        const courseBranches = await Branch.find({ course: courseDoc._id, isActive: true }).select("name");
        const hasGeneralOnlyBranch =
            courseBranches.length === 1 &&
            courseBranches[0].name.toLowerCase() === "general";

        const adminDepartment = (admin.department || "").trim();
        let requestedBranch = (branch || "").trim();

        if (adminDepartment) {
            requestedBranch = adminDepartment;
        }

        if (!requestedBranch && hasGeneralOnlyBranch) {
            requestedBranch = "General";
        }

        if (!requestedBranch && courseBranches.length > 0) {
            return res.status(400).json({ message: "Branch/Department is required for this course" });
        }

        let branchDoc = null;
        if (requestedBranch) {
            branchDoc = await Branch.findOne({
                name: { $regex: `^${requestedBranch}$`, $options: "i" },
                course: courseDoc._id,
                isActive: true,
            });

            if (!branchDoc) {
                return res.status(400).json({ message: "Invalid department/branch for selected course" });
            }
        }

        const subjectFilter = {
            name: { $regex: `^${subject}$`, $options: "i" },
            semester: semesterDoc._id,
            course: courseDoc._id,
            isActive: true,
        };

        if (branchDoc) {
            subjectFilter.branch = branchDoc._id;
        }

        const subjectDoc = await Subject.findOne(subjectFilter);
        if (!subjectDoc) {
            return res.status(400).json({ message: "Invalid subject for selected course/semester/branch" });
        }

        console.log("Uploaded File:", req.file);

        // Create a new note with Cloudinary file URL
        const newNote = new Note({
            title,
            description,
            fileUrl: req.file.path, // Cloudinary URL
            uploadedBy: req.user.id, // Admin ID from JWT
            uploaderModel: 'Admin', // Set the model reference to Admin
            session,
            course: courseDoc.name,
            branch: branchDoc?.name || requestedBranch,
            semester: semesterDoc.name,
            subject: subjectDoc.name,
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
        // Extract filter parameters from the query
        const { uploaderId } = req.query;

        // Build filter object
        const filter = {};

        // If uploaderId is provided, filter by it
        if (uploaderId) {
            filter.uploadedBy = uploaderId;
            filter.uploaderModel = 'Admin'; // Admin-specific view
        }

        const notes = await Note.find(filter).populate("uploadedBy", "name email");
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
        if (note.fileUrl) {
            try {
                // The fileUrl might be a full Cloudinary URL or just a public ID path
                // Try to extract the public ID properly
                let publicId;

                if (note.fileUrl.includes('cloudinary.com')) {
                    // If it's a full Cloudinary URL (e.g., https://res.cloudinary.com/your-cloud/image/upload/v1234567890/notes/abcdef)
                    const urlParts = note.fileUrl.split('/');
                    // Find the 'upload' segment and take everything after it
                    const uploadIndex = urlParts.findIndex(part => part === 'upload');
                    if (uploadIndex !== -1 && uploadIndex < urlParts.length - 2) {
                        // Skip the version number (v1234567890) and get the rest
                        publicId = urlParts.slice(uploadIndex + 2).join('/');
                        // Remove file extension if present
                        publicId = publicId.split('.')[0];
                    }
                } else {
                    // If it's a path stored from req.file.path
                    publicId = note.fileUrl;
                }

                console.log("Attempting to delete from Cloudinary with publicId:", publicId);

                // Delete file from Cloudinary - try without the folder prefix first
                await cloudinary.uploader.destroy(publicId).catch(async () => {
                    // If that fails, try with the folder prefix
                    if (!publicId.startsWith('notes/')) {
                        await cloudinary.uploader.destroy(`notes/${publicId}`);
                    } else {
                        throw new Error("Failed to delete file from Cloudinary");
                    }
                });

                console.log("File deleted successfully from Cloudinary");
            } catch (cloudinaryError) {
                console.error("Error deleting file from Cloudinary:", cloudinaryError);
                // Continue with note deletion even if Cloudinary deletion fails
            }
        }

        // Delete note from database
        await Note.findByIdAndDelete(noteId);

        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        console.error("Delete note error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
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
            if (note.fileUrl) {
                try {
                    // The fileUrl might be a full Cloudinary URL or just a public ID path
                    let publicId;

                    if (note.fileUrl.includes('cloudinary.com')) {
                        // If it's a full Cloudinary URL
                        const urlParts = note.fileUrl.split('/');
                        // Find the 'upload' segment and take everything after it
                        const uploadIndex = urlParts.findIndex(part => part === 'upload');
                        if (uploadIndex !== -1 && uploadIndex < urlParts.length - 2) {
                            // Skip the version number (v1234567890) and get the rest
                            publicId = urlParts.slice(uploadIndex + 2).join('/');
                            // Remove file extension if present
                            publicId = publicId.split('.')[0];
                        }
                    } else {
                        // If it's a path stored from req.file.path
                        publicId = note.fileUrl;
                    }

                    console.log("Attempting to delete old file from Cloudinary:", publicId);

                    // Delete old file from Cloudinary - try without the folder prefix first
                    await cloudinary.uploader.destroy(publicId).catch(async () => {
                        // If that fails, try with the folder prefix
                        if (!publicId.startsWith('notes/')) {
                            await cloudinary.uploader.destroy(`notes/${publicId}`);
                        } else {
                            throw new Error("Failed to delete old file from Cloudinary");
                        }
                    });
                } catch (cloudinaryError) {
                    console.error("Error deleting old file from Cloudinary:", cloudinaryError);
                    // Continue with update even if Cloudinary deletion fails
                }
            }

            // Update with new file URL from req.file
            note.fileUrl = req.file.path;
        }

        // Save updated note
        await note.save();

        res.status(200).json({ message: "Note updated successfully!", note });
    } catch (error) {
        console.error("Update note error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const searchNotes = async (req, res) => {
    try {
        const { query, subject, course, semester, branch, session, page, limit, uploaderId } = req.query;

        let filter = {};

        // Filter by uploader ID if provided (for admin-specific views)
        if (uploaderId) {
            filter.uploadedBy = uploaderId;
            filter.uploaderModel = 'Admin';
        }

        // Full-text search for title/description
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { session: { $regex: query, $options: "i" } },
                { course: { $regex: query, $options: "i" } },
                { branch: { $regex: query, $options: "i" } },
                { semester: { $regex: query, $options: "i" } },
                { subject: { $regex: query, $options: "i" } }
            ];
        }

        // Case-insensitive filtering for other fields
        if (subject) filter.subject = { $regex: `^${subject}$`, $options: "i" };
        if (course) filter.course = { $regex: `^${course}$`, $options: "i" };
        if (semester) filter.semester = { $regex: `^${semester}$`, $options: "i" };
        if (branch) filter.branch = { $regex: `^${branch}$`, $options: "i" };
        if (session) filter.session = { $regex: `^${session}$`, $options: "i" };

        // Pagination settings
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Also populate uploaded details to show admin name
        const notes = await Note.find(filter)
            .populate("uploadedBy", "name email")
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getPublicHomeData = async (req, res) => {
    try {
        const [latestNotes, studentsCount, notesCount, subjectsCount, branchesCount, feedbacks] = await Promise.all([
            Note.find({})
                .populate("uploadedBy", "name")
                .select("title description fileUrl session course branch semester subject createdAt uploadedBy")
                .sort({ createdAt: -1 })
                .limit(4),
            User.countDocuments({ isVerified: true }),
            Note.countDocuments({}),
            Subject.countDocuments({ isActive: true }),
            Branch.countDocuments({ isActive: true }),
            Feedback.find({})
                .populate("user", "name course branch")
                .select("message rating createdAt user")
                .sort({ createdAt: -1 })
                .limit(3),
        ]);

        const testimonials = feedbacks.map((item) => ({
            _id: item._id,
            message: item.message,
            rating: item.rating,
            createdAt: item.createdAt,
            user: {
                name: item.user?.name || "Student",
                course: item.user?.course || "",
                branch: item.user?.branch || "",
            },
        }));

        return res.status(200).json({
            latestNotes,
            stats: {
                students: studentsCount,
                notes: notesCount,
                subjects: subjectsCount,
                branches: branchesCount,
            },
            testimonials,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
