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
                    >
                        <option value="">Select Subject</option>
                        <option value="Data Structures">Data Structures</option>
                        <option value="Algorithms">Algorithms</option>
                        <option value="Database Systems">
                            Database Systems
                        </option>
                        <option value="Operating Systems">
                            Operating Systems
                        </option>
                    </select>

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

// /* eslint-disable no-unused-vars */
// import { useState, useContext, useEffect, useRef } from "react";
// import API from "../../../Api/axiosInstance";
// import AuthContext from "../../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// const UploadNote = () => {
//     const { admin, AdminToken } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         session: "",
//         course: "",
//         branch: "",
//         semester: "",
//         subject: "",
//         file: null,
//     });

//     const [errors, setErrors] = useState("");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         if (admin) {
//             navigate("/admin/uploadnotes");
//         } else {
//             navigate("/adminLogin");
//         }
//     }, [admin, navigate]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, file: e.target.files[0] });
//     };

//     const [whileUpload, setWhileUpload] = useState(false);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formDataToSend = new FormData();
//         Object.keys(formData).forEach((key) => {
//             formDataToSend.append(key, formData[key]);
//         });

//         try {
//             await API.post("/notes/upload", formDataToSend, {
//                 headers: {
//                     Authorization: AdminToken,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             // setMessage("Note uploaded successfully!");
//             toast("Note uploaded successfully!");
//             setErrors("");

//             // Reset form state
//             setFormData({
//                 title: "",
//                 description: "",
//                 session: "",
//                 course: "",
//                 branch: "",
//                 semester: "",
//                 subject: "",
//                 file: null,
//             });

//             // Reset file input manually
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         } catch (err) {
//             console.error(err);
//             setErrors("Error uploading note");
//             toast("Error uploading note");
//         }
//     };

//     const DynamicSession = [
//         "2020",
//         "2021",
//         "2022",
//         "2023",
//         "2024",
//         "2025",
//         "2026",
//         "2027",
//         "2028",
//     ];

//     const DynamicSemester = [
//         "1st",
//         "2nd",
//         "3rd",
//         "4th",
//         "5th",
//         "6th",
//         "7th",
//         "8th",
//     ];

//     const DynamicCourse = ["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "M.Sc"];

//     const DynamicBranch = [
//         "CSE",
//         "IT",
//         "Mechanical",
//         "Civil",
//         "ECE",
//         "FT",
//         "EEE",
//         "AI/ML",
//         "AIROSPACE",
//     ];

//     return (
//         <div className="p-5 bg-gradient-to-r from-slate-800 to-slate-900 w-full min-h-[90%] text-white flex justify-center items-center flex-col">
//             <ToastContainer
//                 position="top-left"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick={false}
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//             <h1 className="text-3xl font-bold mb-8 text-blue-400">
//                 Upload Your Notes Here
//             </h1>
//             {message && (
//                 <p className="text-green-500 bg-green-100 p-2 rounded-lg mb-4">
//                     {message}
//                 </p>
//             )}
//             {errors && (
//                 <p className="text-red-500 bg-red-100 p-2 rounded-lg mb-4">
//                     {errors}
//                 </p>
//             )}
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-slate-700 p-8 w-full max-w-lg rounded-lg shadow-2xl"
//             >
//                 <div className="space-y-4">
//                     <input
//                         type="text"
//                         name="title"
//                         placeholder="Title"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
//                         onChange={handleChange}
//                         value={formData.title}
//                         required
//                     />
//                     <input
//                         type="text"
//                         name="description"
//                         placeholder="Description"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
//                         onChange={handleChange}
//                         value={formData.description}
//                     />
//                     <select
//                         name="session"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                         onChange={handleChange}
//                         value={formData.session}
//                         required
//                     >
//                         <option value="" className="text-gray-300">
//                             Select Session
//                         </option>
//                         {DynamicSession.map((Mysession, index) => (
//                             <option key={index} value={Mysession}>
//                                 {Mysession}
//                             </option>
//                         ))}
//                     </select>
//                     <select
//                         name="course"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                         onChange={handleChange}
//                         value={formData.course}
//                         required
//                     >
//                         <option value="" className="text-gray-300">
//                             Select Course
//                         </option>
//                         {DynamicCourse.map((MyCourse, index) => (
//                             <option key={index} value={MyCourse}>
//                                 {MyCourse}
//                             </option>
//                         ))}
//                     </select>
//                     <select
//                         name="branch"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                         onChange={handleChange}
//                         value={formData.branch}
//                         required
//                     >
//                         <option value="" className="text-gray-300">
//                             Select Branch
//                         </option>
//                         {DynamicBranch.map((MyBranch, index) => (
//                             <option key={index} value={MyBranch}>
//                                 {MyBranch}
//                             </option>
//                         ))}
//                     </select>
//                     <select
//                         name="semester"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                         onChange={handleChange}
//                         value={formData.semester}
//                         required
//                     >
//                         <option value="" className="text-gray-300">
//                             Select Semester
//                         </option>
//                         {DynamicSemester.map((Mysemester, index) => (
//                             <option key={index} value={Mysemester}>
//                                 {Mysemester}
//                             </option>
//                         ))}
//                     </select>
//                     <select
//                         name="subject"
//                         className="p-3 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                         onChange={handleChange}
//                         value={formData.subject}
//                         required
//                     >
//                         <option value="" className="text-gray-300">
//                             Select Subject
//                         </option>
//                         <option value="Data Structures">Data Structures</option>
//                         <option value="Algorithms">Algorithms</option>
//                         <option value="Database Systems">
//                             Database Systems
//                         </option>
//                         <option value="Operating Systems">
//                             Operating Systems
//                         </option>
//                     </select>
//                     <div className="flex flex-col space-y-2">
//                         <label className="text-gray-300 font-medium">
//                             Upload File
//                         </label>
//                         <input
//                             type="file"
//                             name="file"
//                             className="p-2 w-full bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                             onChange={handleFileChange}
//                             ref={fileInputRef}
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer"
//                     >
//                         Upload Note
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UploadNote;

// import { useState, useContext, useEffect, useRef } from "react";
// import API from "../../../Api/axiosInstance";
// import AuthContext from "../../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const UploadNote = () => {
//     const { admin, AdminToken } = useContext(AuthContext);
//     const navigate = useNavigate(); // this is used for navigation
//     const fileInputRef = useRef(null); // Create a ref for the file input

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         session: "",
//         course: "",
//         branch: "",
//         semester: "",
//         subject: "",
//         file: null,
//     });

//     const [errors, setErrors] = useState("");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         if (admin) {
//             navigate("/admin/uploadnotes");
//         } else {
//             navigate("/adminLogin");
//         }
//     }, [admin, navigate]);

//     // Handle input changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle file upload
//     const handleFileChange = (e) => {
//         setFormData({ ...formData, file: e.target.files[0] });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formDataToSend = new FormData();
//         Object.keys(formData).forEach((key) => {
//             formDataToSend.append(key, formData[key]);
//         });

//         try {
//             await API.post("/notes/upload", formDataToSend, {
//                 headers: {
//                     Authorization: AdminToken,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             setMessage("Note uploaded successfully!");
//             setErrors("");

//             // Reset form state
//             setFormData({
//                 title: "",
//                 description: "",
//                 session: "",
//                 course: "",
//                 branch: "",
//                 semester: "",
//                 subject: "",
//                 file: null,
//             });

//             // Reset file input manually
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         } catch (err) {
//             console.error(err);
//             setErrors("Error uploading note");
//         }
//     };

//     // Dynamic Data
//     const DynamicSession = [
//         "2020",
//         "2021",
//         "2022",
//         "2023",
//         "2024",
//         "2025",
//         "2026",
//         "2027",
//         "2028",
//     ];

//     const DynamicSemester = [
//         "1st",
//         "2nd",
//         "3rd",
//         "4th",
//         "5th",
//         "6th",
//         "7th",
//         "8th",
//     ];

//     const DynamicCourse = ["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "M.Sc"];

//     const DynamicBranch = [
//         "CSE",
//         "IT",
//         "Mechanical",
//         "Civil",
//         "ECE",
//         "FT",
//         "EEE",
//         "AI/ML",
//         "AIROSPACE",
//     ];
//     return (
//         <div className="p-5 bg-slate-600 w-full h-screen text-white flex justify-center items-center flex-col">
//             <h1 className="text-2xl font-bold mb-5">Upload Your Notes here</h1>
//             {message && <p className="text-green-600">{message}</p>}
//             {errors && <p className="text-red-600">{errors}</p>}
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-5 w-96 rounded-lg shadow-lg text-black"
//             >
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.title}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     placeholder="Description"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.description}
//                 />
//                 <select
//                     name="session"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.session}
//                     required
//                 >
//                     <option value="">Select Session</option>
//                     {DynamicSession.map((Mysession, index) => (
//                         <option key={index} value={Mysession}>
//                             {Mysession}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                     name="course"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.course}
//                     required
//                 >
//                     <option value="">Select Course</option>
//                     {DynamicCourse.map((MyCourse, index) => (
//                         <option key={index} value={MyCourse}>
//                             {MyCourse}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                     name="branch"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.branch}
//                     required
//                 >
//                     <option value="">Select Branch</option>

//                     {DynamicBranch.map((MyBranch, index) => (
//                         <option key={index} value={MyBranch}>
//                             {MyBranch}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                     name="semester"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.semester}
//                     required
//                 >
//                     <option value="">Select Semester</option>

//                     {DynamicSemester.map((Mysemester, index) => (
//                         <option key={index} value={Mysemester}>
//                             {Mysemester}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                     name="subject"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleChange}
//                     value={formData.subject}
//                     required
//                 >
//                     <option value="">Select Subject</option>
//                     <option value="Data Structures">Data Structures</option>
//                     <option value="Algorithms">Algorithms</option>
//                     <option value="Database Systems">Database Systems</option>
//                     <option value="Operating Systems">Operating Systems</option>
//                 </select>
//                 <input
//                     type="file"
//                     name="file"
//                     className="p-2 w-full mb-3 border rounded"
//                     onChange={handleFileChange}
//                     ref={fileInputRef} // Attach the ref
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white p-2 w-full rounded"
//                 >
//                     Upload Note
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UploadNote;
