import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate("/dashboard"); // Redirect if already logged in
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            setForm({ email: "", password: "" });
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.response?.data?.message || "Error logging in.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 w-full h-screen">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {message && <p className="text-green-600">{String(message)}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="p-2 w-full border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="p-2 w-full border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 w-full rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
