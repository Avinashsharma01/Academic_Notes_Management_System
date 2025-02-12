import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Config/cloudinary.js";

// Set up Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "collage", // Folder in Cloudinary
        allowedFormats: ["pdf", "doc", "docx", "png", "jpg", "mp4"],
    },
});

const upload = multer({ storage });

export default upload;


