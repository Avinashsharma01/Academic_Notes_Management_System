import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../Api/axiosInstance.js";
import {
    FaUser,
    FaBook,
    FaCodeBranch,
    FaIdCard,
    FaEnvelope,
    FaLock,
    FaUserPlus,
} from "react-icons/fa";

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
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const [whileSignUp, setWhileSignUp] = useState(false);

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
        setWhileSignUp(true);

        if (!validateForm()) {
            setWhileSignUp(false);
            return;
        }

        try {
            const { data } = await API.post("/auth/signup", form);
            setMessage(data.message);
            setMessageType("success");

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
            setMessageType("error");
        } finally {
            setWhileSignUp(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join us to access study materials and resources
                    </p>
                </div>

                {message && (
                    <div
                        className={`${
                            messageType === "success"
                                ? "bg-green-100 border-green-500 text-green-700"
                                : "bg-red-100 border-red-500 text-red-700"
                        } border-l-4 p-4 rounded-md`}
                        role="alert"
                    >
                        <p>{String(message)}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="course"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Course
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaBook className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="course"
                                type="text"
                                name="course"
                                placeholder="e.g. B.Tech, MCA"
                                value={form.course}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        {errors.course && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.course}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="branch"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Branch
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaCodeBranch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="branch"
                                type="text"
                                name="branch"
                                placeholder="e.g. CSE, IT, ECE"
                                value={form.branch}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        {errors.branch && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.branch}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="enrollment"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Enrollment Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaIdCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="enrollment"
                                type="text"
                                name="enrollment"
                                placeholder="Your enrollment ID"
                                value={form.enrollment}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        {errors.enrollment && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.enrollment}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={whileSignUp}
                            className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                            ${
                                whileSignUp
                                    ? "bg-blue-400"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600"
                            } 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md`}
                        >
                            {whileSignUp ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <FaUserPlus className="h-5 w-5 mr-2" />
                                    Sign up
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div>
                            <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <img
                                    className="h-5 w-5"
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google logo"
                                />
                            </a>
                        </div>
                        <div>
                            <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <svg
                                    className="h-5 w-5 text-[#1877F2]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
