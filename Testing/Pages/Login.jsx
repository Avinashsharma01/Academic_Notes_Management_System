import { useState, useContext } from "react";
// import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(form);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="p-2 w-full border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
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
