/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useRef } from "react";
import API from "../../../Api/axiosInstance";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UploadNote = () => {
    const { admin, AdminToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

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
    const [whileUpload, setWhileUpload] = useState(false); // Uploading state

    useEffect(() => {
        if (admin) {
            navigate("/admin/uploadnotes");
        } else {
            navigate("/adminLogin");
        }
    }, [admin, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setWhileUpload(true); // Start uploading state
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

            toast.success("Note uploaded successfully!");
            setErrors("");
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

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (err) {
            console.error(err);
            setErrors("Error uploading note");
            toast.error("Error uploading note");
        } finally {
            setWhileUpload(false); // Stop uploading state
        }
    };

    const DynamicSession = [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
    ];
    const DynamicSemester = [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
    ];
    const DynamicCourse = ["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "M.Sc"];
    const DynamicBranch = [
        "CSE",
        "IT",
        "Mechanical",
        "Civil",
        "ECE",
        "FT",
        "EEE",
        "AI/ML",
        "AIROSPACE",
    ];

    // Subjects mapping based on branch and semester
    const subjectsByBranchAndSemester = {
        CSE: {
            "1st": [
                "Engineering Mathematics",
                "Engineering Physics",
                "Engineering Chemistry",
                "Basic Electrical Engineering",
                "Engineering Mechanics",
                "Engineering Drawing",
            ],
            "2nd": [
                "Advanced Mathematics",
                "Data Structures",
                "Digital Electronics",
                "Computer Organization",
                "Programming Fundamentals",
            ],
            "3rd": [
                "Object Oriented Programming",
                "Database Management Systems",
                "Computer Networks",
                "Operating Systems",
                "Theory of Computation",
            ],
            "4th": [
                "Software Engineering",
                "Compiler Design",
                "Computer Architecture",
                "Microprocessors",
                "System Programming",
            ],
            "5th": [
                "Machine Learning",
                "Cloud Computing",
                "Blockchain Technology",
                "Web Development",
                "Mobile Computing",
            ],
            "6th": [
                "Deep Learning",
                "Big Data Analytics",
                "Cyber Security",
                "Internet of Things",
                "Distributed Systems",
            ],
            "7th": [
                "Artificial Intelligence",
                "Natural Language Processing",
                "Computer Vision",
                "Robotics",
                "Advanced Database Systems",
            ],
            "8th": [
                "Project Management",
                "Advanced Topics in AI",
                "Advanced Topics in ML",
                "Advanced Topics in Security",
                "Advanced Topics in Networks",
            ],
        },
        IT: {
            "1st": [
                "Engineering Mathematics",
                "Computer Fundamentals",
                "Digital Logic",
                "Communication Skills",
                "Introduction to IT",
                "Workshop Practice",
            ],
            "2nd": [
                "Discrete Mathematics",
                "Data Structures",
                "Object Oriented Programming",
                "Database Concepts",
                "Web Technologies",
            ],
            "3rd": [
                "Software Engineering",
                "Advanced Database Systems",
                "Computer Networks",
                "Operating Systems",
                "Design Patterns",
            ],
            "4th": [
                "Web Application Development",
                "Network Security",
                "Mobile Application Development",
                "Cloud Infrastructure",
                "System Analysis and Design",
            ],
            "5th": [
                "Data Analytics",
                "DevOps Practices",
                "IT Service Management",
                "Enterprise Architecture",
                "Business Intelligence",
            ],
            "6th": [
                "Information Security",
                "Software Testing",
                "IT Project Management",
                "Data Warehousing",
                "Enterprise Resource Planning",
            ],
            "7th": [
                "Machine Learning Applications",
                "IT Governance",
                "Internet of Things",
                "Digital Transformation",
                "Emerging Technologies",
            ],
            "8th": [
                "Capstone Project",
                "IT Ethics",
                "IT Innovation and Entrepreneurship",
                "Industry Internship",
                "Professional Development",
            ],
        },
    };

    // For backwards compatibility
    const subjectsBySemester = subjectsByBranchAndSemester["CSE"];

    return (
        <div className="p-5 bg-gradient-to-r from-slate-800 to-slate-900 w-full min-h-[90%] text-white flex justify-center items-center flex-col">
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h1 className="text-3xl font-bold mb-8 text-blue-400">
                Upload Your Notes Here
            </h1>

            {message && (
                <p className="text-green-500 bg-green-100 p-2 rounded-lg mb-4">
                    {message}
                </p>
            )}
            {errors && (
                <p className="text-red-500 bg-red-100 p-2 rounded-lg mb-4">
                    {errors}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-slate-700 p-8 w-full max-w-lg rounded-lg shadow-2xl"
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <select
                        name="session"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        onChange={handleChange}
                        value={formData.session}
                        required
                    >
                        <option value="">Select Session</option>
                        {DynamicSession.map((session, index) => (
                            <option key={index} value={session}>
                                {session}
                            </option>
                        ))}
                    </select>

                    <select
                        name="course"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        onChange={handleChange}
                        value={formData.course}
                        required
                    >
                        <option value="">Select Course</option>
                        {DynamicCourse.map((course, index) => (
                            <option key={index} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>

                    <select
                        name="branch"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        onChange={handleChange}
                        value={formData.branch}
                        required
                    >
                        <option value="">Select Branch</option>
                        {DynamicBranch.map((branch, index) => (
                            <option key={index} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>

                    <select
                        name="semester"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        onChange={handleChange}
                        value={formData.semester}
                        required
                    >
                        <option value="">Select Semester</option>
                        {DynamicSemester.map((semester, index) => (
                            <option key={index} value={semester}>
                                {semester}
                            </option>
                        ))}
                    </select>

                    <select
                        name="subject"
                        className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        onChange={handleChange}
                        value={formData.subject}
                        required
                        disabled={!formData.semester || !formData.branch}
                    >
                        <option value="">Select Subject</option>
                        {formData.semester &&
                            formData.branch &&
                            subjectsByBranchAndSemester[formData.branch]?.[
                                formData.semester
                            ]?.map((subject, index) => (
                                <option key={index} value={subject}>
                                    {subject}
                                </option>
                            ))}
                    </select>
                    {!formData.semester && (
                        <p className="text-xs text-blue-300 mt-1">
                            Select a semester first to view subjects
                        </p>
                    )}
                    {formData.semester && !formData.branch && (
                        <p className="text-xs text-blue-300 mt-1">
                            Select a branch first to view subjects
                        </p>
                    )}

                    <div className="flex flex-col space-y-2">
                        <label className="text-gray-300 font-medium">
                            Upload File
                        </label>
                        <input
                            type="file"
                            name="file"
                            className="p-2 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg transition-all duration-300 ${
                            whileUpload
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={whileUpload}
                    >
                        {whileUpload ? "Uploading..." : "Upload Note"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadNote;
