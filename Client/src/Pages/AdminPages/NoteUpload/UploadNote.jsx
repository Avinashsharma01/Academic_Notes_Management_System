/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useRef } from "react";
import API from "../../../Api/axiosInstance";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Import custom components
import UploadHeader from "./Components/UploadHeader";
import FormNotifications from "./Components/FormNotifications";
import TextFields from "./Components/TextFields";
import FileUploadField from "./Components/FileUploadField";
import SubmitButton from "./Components/SubmitButton";

const UploadNote = () => {
    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        session: "",
        course: admin?.course || "",
        branch: admin?.department || "",
        semester: "",
        subject: "",
        file: null,
    });

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [whileUpload, setWhileUpload] = useState(false);

    // API-fetched dropdown data
    const [sessions, setSessions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (admin) {
            navigate("/admin/uploadnotes");
        } else {
            navigate("/adminLogin");
        }
    }, [admin, navigate]);

    // Set course/branch from admin profile
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            course: admin?.course || "",
            branch: admin?.department || "",
        }));
    }, [admin]);

    // Fetch sessions and courses on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionsRes, coursesRes] = await Promise.all([
                    API.get("/academic/sessions"),
                    API.get("/academic/courses"),
                ]);
                setSessions(sessionsRes.data);
                setCourses(coursesRes.data);
            } catch (err) {
                console.error("Failed to fetch dropdown data:", err);
            }
        };
        fetchData();
    }, []);

    // Fetch branches/semesters when course changes
    useEffect(() => {
        if (formData.course) {
            const fetchCourseAcademicData = async () => {
                try {
                    // Find the course object to get its ID
                    const courseObj = courses.find((c) => c.name === formData.course);
                    if (courseObj) {
                        const [semesterRes, branchRes] = await Promise.all([
                            API.get(`/academic/semesters?course=${courseObj._id}`),
                            API.get(`/academic/branches?course=${courseObj._id}`),
                        ]);
                        setSemesters(semesterRes.data);
                        setBranches(branchRes.data);

                        const isGeneralOnlyCourse =
                            branchRes.data.length === 1 &&
                            branchRes.data[0]?.name?.toLowerCase() === "general";

                        if (isGeneralOnlyCourse && !admin?.department) {
                            setFormData((prev) => ({ ...prev, branch: "General" }));
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch semesters:", err);
                }
            };
            fetchCourseAcademicData();
        } else {
            setSemesters([]);
            setBranches([]);
        }
        setFormData((prev) => ({ ...prev, semester: "", subject: "" }));
        setSubjects([]);
    }, [formData.course, courses, admin?.department]);

    // Fetch subjects when semester changes
    useEffect(() => {
        if (formData.semester && formData.course) {
            const fetchSubjects = async () => {
                try {
                    const courseObj = courses.find((c) => c.name === formData.course);
                    const semesterObj = semesters.find((s) => s.name === formData.semester);
                    if (!courseObj || !semesterObj) {
                        setSubjects([]);
                        return;
                    }

                    const params = [`course=${courseObj._id}`, `semester=${semesterObj._id}`];

                    const matchedBranch = branches.find(
                        (b) => b.name?.toLowerCase() === (formData.branch || "").toLowerCase()
                    );

                    if (matchedBranch?._id) {
                        params.push(`branch=${matchedBranch._id}`);
                    }

                    const { data } = await API.get(`/academic/subjects?${params.join("&")}`);

                    const uniqueSubjects = Array.from(
                        new Set(data.map((s) => s.name).filter(Boolean))
                    );

                    setSubjects(uniqueSubjects);
                } catch (err) {
                    console.error("Failed to fetch subjects:", err);
                }
            };
            fetchSubjects();
        } else {
            setSubjects([]);
        }
    }, [formData.semester, formData.course, formData.branch, branches, courses, semesters]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setWhileUpload(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            await API.post("/notes/upload", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Note uploaded successfully!");
            setErrors("");
            setFormData({
                title: "",
                description: "",
                session: "",
                course: admin?.course || "",
                branch: admin?.department || "",
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
            setWhileUpload(false);
        }
    };

    const selectClass = "appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white";

    return (
        <div className="min-h-screen bg-linear-to-r from-slate-800 to-slate-900 p-6 w-full text-white flex justify-center items-center relative overflow-hidden">
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
                <UploadHeader />
                <FormNotifications message={message} errors={errors} />

                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-700 p-8 rounded-lg shadow-2xl border border-slate-600 space-y-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <TextFields
                            formData={formData}
                            handleChange={handleChange}
                        />

                        {/* Session */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Session</label>
                            <select name="session" className={selectClass} onChange={handleChange} value={formData.session} required>
                                <option value="">Select Session</option>
                                {sessions.map((s) => (
                                    <option key={s._id} value={s.year}>{s.year} ({s.startYear}-{s.endYear})</option>
                                ))}
                            </select>
                        </div>

                        {/* Course */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Course</label>
                            {admin?.course ? (
                                <input
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    readOnly
                                    className="block w-full p-3 bg-slate-600/50 border border-slate-500 rounded-lg text-gray-300 cursor-not-allowed"
                                />
                            ) : (
                                <select name="course" className={selectClass} onChange={handleChange} value={formData.course} required>
                                    <option value="">Select Course</option>
                                    {courses.map((c) => (
                                        <option key={c._id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Branch — auto-populated and locked to admin's department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Branch / Department
                                {admin?.department && (
                                    <span className="text-xs text-blue-400 ml-2">(Restricted to your department)</span>
                                )}
                            </label>
                            <input
                                type="text"
                                name="branch"
                                value={formData.branch || "General"}
                                readOnly
                                className="block w-full p-3 bg-slate-600/50 border border-slate-500 rounded-lg text-gray-300 cursor-not-allowed"
                            />
                        </div>

                        {/* Semester */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Semester</label>
                            <select name="semester" className={selectClass} onChange={handleChange} value={formData.semester} required disabled={!formData.course}>
                                <option value="">Select Semester</option>
                                {semesters.map((s) => (
                                    <option key={s._id} value={s.name}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subject */}
                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                            <select name="subject" className={selectClass} onChange={handleChange} value={formData.subject} required disabled={!formData.semester}>
                                <option value="">Select Subject</option>
                                {subjects.map((subject, index) => (
                                    <option key={index} value={subject}>{subject}</option>
                                ))}
                            </select>
                            {!formData.semester && (
                                <p className="text-xs text-blue-300 mt-1">Select a semester first to view subjects</p>
                            )}
                        </div>

                        <FileUploadField
                            handleFileChange={handleFileChange}
                            fileInputRef={fileInputRef}
                            selectedFile={formData.file}
                        />
                    </div>

                    <SubmitButton isUploading={whileUpload} />
                </form>
            </div>
        </div>
    );
};

export default UploadNote;
