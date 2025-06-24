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
import SelectionFields from "./Components/SelectionFields";
import FileUploadField from "./Components/FileUploadField";
import SubmitButton from "./Components/SubmitButton";

// Import form data
import {
    DynamicSession,
    DynamicSemester,
    DynamicCourse,
    DynamicBranch,
    subjectsByBranchAndSemester,
} from "./utils/formData";

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

                        <SelectionFields
                            formData={formData}
                            handleChange={handleChange}
                            DynamicSession={DynamicSession}
                            DynamicCourse={DynamicCourse}
                            DynamicBranch={DynamicBranch}
                            DynamicSemester={DynamicSemester}
                            subjectsByBranchAndSemester={
                                subjectsByBranchAndSemester
                            }
                        />

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
