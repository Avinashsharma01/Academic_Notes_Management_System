import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserPlus,
    FaUserShield,
} from "react-icons/fa";

const AdminSignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [whileSignUp, setWhileSignUp] = useState(false);
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setWhileSignUp(true);
        try {
            const { data } = await API.post("/auth/signupAdmin", form);
            setMessage(data.message);
            toast.success(data.message || "Registration successful!");
            setForm({
                name: "",
                email: "",
                password: "",
            }); // Reset on success
        } catch (error) {
            const errorMsg =
                error.response?.data?.message || "Error registering user.";
            setMessage(errorMsg);
            toast.error(errorMsg);
        } finally {
            setWhileSignUp(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

            <div className="max-w-md w-full space-y-8 bg-slate-700 p-8 rounded-lg shadow-2xl border border-slate-600 z-10 relative">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <FaUserShield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-400 tracking-tight">
                        Admin Registration
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Create an admin account to manage the system
                    </p>
                </div>

                {message && (
                    <div
                        className={`${
                            message.includes("Error")
                                ? "bg-red-900/40 border-red-500 text-red-100"
                                : "bg-green-900/40 border-green-500 text-green-100"
                        } border-l-4 p-4 rounded-md`}
                        role="alert"
                    >
                        <p>{String(message)}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md -space-y-px">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-10 py-3 border border-slate-500 bg-slate-600 placeholder-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="admin@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-10 py-3 border border-slate-500 bg-slate-600 placeholder-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none relative block w-full px-10 py-3 border border-slate-500 bg-slate-600 placeholder-gray-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                Password should be at least 6 characters long
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={whileSignUp}
                            className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                            ${
                                whileSignUp
                                    ? "bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
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
                                    Register as Admin
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-300">
                        Already have an admin account?{" "}
                        <Link
                            to="/admin/login"
                            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignUp;
