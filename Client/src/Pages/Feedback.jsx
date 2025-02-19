import { useContext, useState } from "react";
import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Feedback = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user, admin, AdminToken, UserToken } = useContext(AuthContext);

    // const emojiRatings = ["😡", "😕", "😐", "😊", "😍"];
    const emojiRatings = [
        { name: "Angry", emoji: "😡" },
        { name: "Disappointed", emoji: "😕" },
        { name: "Neutral", emoji: "😐" },
        { name: "Happy", emoji: "😊" },
        { name: "Loving", emoji: "😍" },
    ];

    // Example of how to access the data
    emojiRatings.forEach((rating) => {
        console.log(`${rating.name}: ${rating.emoji}`);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!user && !admin) {
            navigate("/login");
            return;
        }

        if (!message || rating < 1 || rating > 5) {
            setError("Please enter a message and select a valid rating.");
            return;
        }

        try {
            // const Usertoken = localStorage.getItem("authToken");
            // const Admintoken = localStorage.getItem("authTokenAdmin");
            const { data } = await API.post(
                "/feedback",
                {
                    message,
                    rating,
                },
                {
                    headers: {
                        Authorization: UserToken || AdminToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessage(data.message);
            setSuccess("Feedback submitted successfully!");
            toast.success("Feedback submitted successfully!");
            setMessage("");
            setRating(1);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to submit feedback."
            );
        }
    };

    return (
        <div className="p-5 bg-slate-600  w-full h-screen text-white flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%]">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Feedback Form
                </h2>

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

                {error && (
                    <p className="text-red-400 text-sm text-center">
                        {String(error)}
                    </p>
                )}
                {success && (
                    <p className="text-green-400 text-sm text-center">
                        {String(success)}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="mb-2">Message:</label>
                    <textarea
                        className="p-2 bg-gray-700 rounded"
                        rows={8}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        // required
                    />

                    <label className="mt-4 mb-2">Rating:</label>
                    <div className="flex justify-evenly p-2 bg-gray-700 rounded ">
                        {emojiRatings.map((item, index) => (
                            <span
                                key={index}
                                className={`cursor-pointer text-2xl ${
                                    rating === index + 1 ? "scale-200" : ""
                                }`}
                                onClick={() => setRating(index + 1)}
                            >
                                {item.emoji}
                            </span>
                        ))}
                    </div>

                    {/* <div className="flex justify-evenly p-2 bg-gray-700 rounded">
                        {emojiRatings.map((item, index) => (
                            <div key={index} className="relative group">
                                <span
                                    className={`cursor-pointer text-2xl ${
                                        rating === index + 1 ? "scale-200" : ""
                                    }`}
                                    onClick={() => setRating(index + 1)}
                                >
                                    {item.emoji}
                                </span>
                                
                                <span className="absolute -left-2 -top-5 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div> */}

                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
