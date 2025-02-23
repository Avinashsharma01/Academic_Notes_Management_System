import { useState } from "react";
import API from "../Api/axiosInstance.js";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        course: "",
        branch: "",
        enrollment: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Validation function
    const validateForm = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.course.trim()) {
            newErrors.course = "Course is required";
        }

        if (!form.branch.trim()) {
            newErrors.branch = "Branch is required";
        }

        if (!form.enrollment.trim()) {
            newErrors.enrollment = "Enrollment is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const { data } = await API.post("/auth/signup", form);
            setMessage(data.message);

            setForm({
                name: "",
                course: "",
                branch: "",
                enrollment: "",
                email: "",
                password: "",
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Error registering user."
            );
        }
    };

    return (
        <div className="w-full h-screen bg-[#1E2A38]">
            <div className="max-w-md mx-auto w-full h-screen pt-40 text-white flex items-center flex-col">
                <h2 className="text-2xl font-bold mb-4">
                    Please Register Here
                </h2>
                {message && <p className="text-green-600">{String(message)}</p>}

                <form onSubmit={handleSubmit} className="space-y-3 w-full">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="p-2 w-full border rounded text-white"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name}</p>
                    )}

                    <input
                        type="text"
                        name="course"
                        placeholder="Course"
                        value={form.course}
                        onChange={handleChange}
                        className="p-2 w-full border rounded text-white"
                    />
                    {errors.course && (
                        <p className="text-red-500">{errors.course}</p>
                    )}

                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={form.branch}
                        onChange={handleChange}
                        className="p-2 w-full border rounded text-white"
                    />
                    {errors.branch && (
                        <p className="text-red-500">{errors.branch}</p>
                    )}

                    <input
                        type="text"
                        name="enrollment"
                        placeholder="Enrollment"
                        value={form.enrollment}
                        onChange={handleChange}
                        className="p-2 w-full border rounded text-white"
                    />
                    {errors.enrollment && (
                        <p className="text-red-500">{errors.enrollment}</p>
                    )}

                    <div className="relative w-full flex justify-center items-center flex-col">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="p-2 w-full border rounded text-white"
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="p-2 w-full border rounded text-white"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 w-full rounded "
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

// import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import API from "../Api/axiosInstance.js";

// const SignUp = () => {
//     // const navigate = useNavigate();
//     const [form, setForm] = useState({
//         name: "",
//         course: "",
//         branch: "",
//         enrollment: "",
//         email: "",
//         password: "",
//     });
//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await API.post("/auth/signup", form);
//             setMessage(data.message);
//             setForm({
//                 name: "",
//                 course: "",
//                 branch: "",
//                 enrollment: "",
//                 email: "",
//                 password: "",
//             }); // Reset on success
//         } catch (error) {
//             setMessage(
//                 error.response?.data?.message || "Error registering user."
//             );
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto w-full h-screen  mt-10 flex  items-center flex-col">
//             <h2 className="text-2xl font-bold mb-4">Please Register here</h2>
//             {message && <p>{String(message)}</p>}
//             <form onSubmit={handleSubmit} className="space-y-3">
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     className="p-2 w-full border rounded"
//                 />
//                 <input
//                     type="text"
//                     name="course"
//                     placeholder="Course"
//                     value={form.course}
//                     onChange={handleChange}
//                     required
//                     className="p-2 w-full border rounded"
//                 />
//                 <input
//                     type="text"
//                     name="branch"
//                     placeholder="Branch"
//                     value={form.branch}
//                     onChange={handleChange}
//                     required
//                     className="p-2 w-full border rounded"
//                 />
//                 <input
//                     type="text"
//                     name="enrollment"
//                     placeholder="Enrollment"
//                     value={form.enrollment}
//                     onChange={handleChange}
//                     required
//                     className="p-2 w-full border rounded"
//                 />
//                 <div className="email">
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                         className="p-2 w-full border rounded"
//                     />
//                     <button>Verify</button>
//                 </div>
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                     className="p-2 w-full border rounded"
//                 />

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white p-2 w-full rounded"
//                     // onClick={() => navigate("/login")}
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SignUp;
