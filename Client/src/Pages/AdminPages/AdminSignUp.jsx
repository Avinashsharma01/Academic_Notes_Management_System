import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import API from "../../Api/axiosInstance";

const AdminSignUp = () => {
    // const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/signupAdmin", form);
            setMessage(data.message);
            setForm({
                name: "",
                email: "",
                password: "",
            }); // Reset on success
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Error registering user."
            );
        }
    };

    return (
        <div className="max-w-md mx-auto w-full h-screen mt-10 flex  items-center flex-col">
            <h2 className="text-2xl font-bold mb-4">
                Admin Please Register here
            </h2>
            {message && <p>{String(message)}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="p-2 w-full border rounded"
                />
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
                    // onClick={() => navigate("/login")}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default AdminSignUp;
