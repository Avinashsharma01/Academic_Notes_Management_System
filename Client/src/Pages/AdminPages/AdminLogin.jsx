import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserShield } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { admin, Adminlogin } = useContext(AuthContext);

    useEffect(() => {
        if (admin) {
            navigate("/admin/admindashboard"); // Redirect if already logged in
        }
    }, [admin, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Adminlogin(form);
            setForm({ email: "", password: "" });
            toast.success("Login successful! Redirecting to dashboard...");
            setTimeout(() => {
                navigate("/admin/admindashboard"); // Redirect to dashboard with slight delay for toast
            }, 1000);
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                "Invalid admin credentials. Please try again.";
            setMessage(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
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

            <div className="max-w-md w-full space-y-8 bg-slate-700 p-8 rounded-lg shadow-2xl border border-slate-600 z-10">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                        <FaUserShield className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-400 tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Sign in to access the admin dashboard
                    </p>
                </div>

                {message && (
                    <div
                        className="bg-red-900/40 border-l-4 border-red-500 text-red-100 p-4 rounded-md"
                        role="alert"
                    >
                        <p>{String(message)}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md -space-y-px">
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
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                            ${
                                loading
                                    ? "bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
                            } 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md`}
                        >
                            {loading ? (
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
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt className="h-5 w-5 mr-2" />
                                    Sign in as Admin
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-300">
                        Not an admin?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Return to user login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
