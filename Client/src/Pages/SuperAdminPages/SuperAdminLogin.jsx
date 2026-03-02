import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";

const SuperAdminLogin = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { superAdmin, superAdminLogin } = useContext(AuthContext);

    useEffect(() => {
        if (superAdmin) {
            navigate("/dashboard");
        }
    }, [superAdmin, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await superAdminLogin(form);
            navigate("/dashboard");
        } catch (error) {
            console.error("SuperAdmin login error:", error);
            setMessage(
                error.response?.data?.message ||
                "Invalid credentials. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-purple-500/20">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
                        <FaShieldAlt className="text-purple-400 text-3xl" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        SuperAdmin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        System-level access to manage all users and admins
                    </p>
                </div>

                {message && (
                    <div className="bg-red-900/40 border-l-4 border-red-500 text-red-300 p-4 rounded-md">
                        <p>{String(message)}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="superadmin@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="block w-full px-10 py-3 bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="block w-full px-10 py-3 bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white 
                        ${loading
                                ? "bg-purple-800"
                                : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600"
                            } 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-lg`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <FaShieldAlt className="mr-2" />
                                Sign in as SuperAdmin
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Not a SuperAdmin?{" "}
                        <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
                            Return to user login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
