import { useState } from "react";
import API from "../Api/axiosInstance.js";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/register", form);
            setMessage(data.message);
        } catch (error) {
            setMessage(error, "Error registering user.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                    className="p-2 w-full border rounded"
                />
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
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
