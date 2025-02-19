import { useState, useContext, useEffect, useRef } from "react";
import API from "../../../Api/axiosInstance";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const UploadNote = () => {
    const { admin, AdminToken } = useContext(AuthContext);
    const navigate = useNavigate(); // this is used for navigation
    const fileInputRef = useRef(null); // Create a ref for the file input

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        session: "",
        course: "",
        branch: "",
        semester: "",
        subject: "",
        file: null,
    });

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (admin) {
            navigate("/uploadnotes");
        } else {
            navigate("/adminLogin");
        }
    }, [admin, navigate]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            await API.post("/notes/upload", formDataToSend, {
                headers: {
                    Authorization: AdminToken,
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage("Note uploaded successfully!");
            setErrors("");

            // Reset form state
            setFormData({
                title: "",
                description: "",
                session: "",
                course: "",
                branch: "",
                semester: "",
                subject: "",
                file: null,
            });

            // Reset file input manually
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (err) {
            console.error(err);
            setErrors("Error uploading note");
        }
    };

    return (
        <div className="p-5 bg-slate-600 w-full h-screen text-white flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold mb-5">Upload New Note</h1>
            {message && <p className="text-green-600">{message}</p>}
            {errors && <p className="text-red-600">{errors}</p>}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 w-96 rounded-lg shadow-lg text-black"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.title}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.description}
                />
                <select
                    name="session"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.session}
                    required
                >
                    <option value="">Select Session</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                </select>
                <select
                    name="course"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.course}
                    required
                >
                    <option value="">Select Course</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="M.Sc">M.Sc</option>
                </select>
                <select
                    name="branch"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.branch}
                    required
                >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                </select>
                <select
                    name="semester"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.semester}
                    required
                >
                    <option value="">Select Semester</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                </select>
                <select
                    name="subject"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleChange}
                    value={formData.subject}
                    required
                >
                    <option value="">Select Subject</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Database Systems">Database Systems</option>
                    <option value="Operating Systems">Operating Systems</option>
                </select>
                <input
                    type="file"
                    name="file"
                    className="p-2 w-full mb-3 border rounded"
                    onChange={handleFileChange}
                    ref={fileInputRef} // Attach the ref
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full rounded"
                >
                    Upload Note
                </button>
            </form>
        </div>
    );
};

export default UploadNote;
