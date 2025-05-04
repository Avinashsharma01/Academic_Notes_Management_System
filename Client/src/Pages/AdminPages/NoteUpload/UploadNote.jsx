/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useRef } from "react";
import API from "../../../Api/axiosInstance";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaCloudUploadAlt, FaBook, FaFile, FaSpinner } from "react-icons/fa";

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

    // Session mapping based on year
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

    // Semester mapping based on course
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
    // Course mapping based on session
    const DynamicCourse = ["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "M.Sc"];

    // Branch mapping based on Course
    const DynamicBranch = [
        "CSE",
        "IT",
        "Mechanical",
        "Civil",
        "ECE",
        "FT",
        "EEE",
        "AI/ML",
        "AEROSPACE",
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
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 p-6 w-full text-white flex justify-center items-center relative overflow-hidden">
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

            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

            <div className="w-full max-w-2xl z-10">
                <div className="text-center mb-8">
                    <div className="mx-auto h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <FaCloudUploadAlt className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-blue-400 tracking-tight">
                        Upload Notes
                    </h1>
                    <p className="mt-2 text-gray-300">
                        Share educational resources with students
                    </p>
                </div>

                {message && (
                    <div className="bg-green-900/40 border-l-4 border-green-500 text-green-100 p-4 rounded-md mb-6">
                        <p>{message}</p>
                    </div>
                )}

                {errors && (
                    <div className="bg-red-900/40 border-l-4 border-red-500 text-red-100 p-4 rounded-md mb-6">
                        <p>{errors}</p>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-700 p-8 rounded-lg shadow-2xl border border-slate-600 space-y-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Title
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaBook className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter note title"
                                    className="appearance-none block w-full pl-10 pr-3 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                                    onChange={handleChange}
                                    value={formData.title}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Brief description about the note"
                                rows="3"
                                className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                                onChange={handleChange}
                                value={formData.description}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Session
                            </label>
                            <select
                                name="session"
                                className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Course
                            </label>
                            <select
                                name="course"
                                className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Branch
                            </label>
                            <select
                                name="branch"
                                className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Semester
                            </label>
                            <select
                                name="semester"
                                className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Subject
                            </label>
                            <select
                                name="subject"
                                className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                onChange={handleChange}
                                value={formData.subject}
                                required
                                disabled={
                                    !formData.semester || !formData.branch
                                }
                            >
                                <option value="">Select Subject</option>
                                {formData.semester &&
                                    formData.branch &&
                                    subjectsByBranchAndSemester[
                                        formData.branch
                                    ]?.[formData.semester]?.map(
                                        (subject, index) => (
                                            <option key={index} value={subject}>
                                                {subject}
                                            </option>
                                        )
                                    )}
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
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Upload File
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-slate-500 bg-slate-600/50 hover:bg-slate-600 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FaFile className="w-8 h-8 mb-3 text-blue-400" />
                                        <p className="mb-2 text-sm text-gray-300">
                                            <span className="font-semibold">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            PDF, DOCX, PPTX (MAX. 10MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        required
                                    />
                                </label>
                            </div>
                            {formData.file && (
                                <p className="text-sm text-green-300 mt-2">
                                    File selected: {formData.file.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className={`w-full p-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                whileUpload
                                    ? "bg-blue-700 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/20"
                            }`}
                            disabled={whileUpload}
                        >
                            {whileUpload ? (
                                <>
                                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="h-5 w-5 mr-2" />
                                    Upload Note
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadNote;
