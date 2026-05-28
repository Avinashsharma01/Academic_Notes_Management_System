import { useContext, useEffect, useState } from "react";
import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaPaperPlane,
    FaComment,
    FaStar,
    FaLightbulb,
    FaTags,
} from "react-icons/fa";
import CallToAction from "../Components/CallToAction";

const Feedback = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user, admin } = useContext(AuthContext);

    // Suggested feedback messages for lazy users
    const suggestedFeedbacks = [
        {
            text: "The notes quality is excellent and very helpful for my studies.",
            rating: 5,
        },
        {
            text: "The website is easy to navigate and find what I need.",
            rating: 4,
        },
        {
            text: "The search functionality could be improved to find notes faster.",
            rating: 3,
        },
        { text: "I'd like to see more notes on advanced topics.", rating: 4 },
        { text: "The download process is smooth and quick.", rating: 5 },
        {
            text: "Some notes need better formatting and organization.",
            rating: 2,
        },
        {
            text: "The platform has helped me improve my academic performance.",
            rating: 5,
        },
        {
            text: "I wish there were more notes available for my specific course.",
            rating: 3,
        },
    ];

    const handleSuggestedFeedback = (suggestion) => {
        setMessage(suggestion.text);
        setRating(suggestion.rating);

        // Scroll to the submit button
        setTimeout(() => {
            document.getElementById("submit-button")?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 100);
    };

    const emojiRatings = [
        { name: "Angry", emoji: "😡" },
        { name: "Disappointed", emoji: "😕" },
        { name: "Neutral", emoji: "😐" },
        { name: "Happy", emoji: "😊" },
        { name: "Loving", emoji: "😍" },
    ];

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
            toast.error("Please enter a message and select a valid rating.");
            return;
        }

        try {
            const { data } = await API.post("/feedback", {
                message,
                rating,
            });
            setMessage(data.message);
            setSuccess("Feedback submitted successfully!");
            toast.success("Feedback submitted successfully!");
            setMessage("");
            setRating(1);
        } catch (err) {
            const errorMsg =
                err.response?.data?.message || "Failed to submit feedback.";
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-r from-slate-800 to-slate-900 text-white overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

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

            <div className="relative z-10 pt-16 md:pt-20 pb-10 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className="mx-auto h-16 w-16 md:h-20 md:w-20 rounded-full bg-blue-500 flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-blue-500/30">
                        <FaComment className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                        Share Your Feedback
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Your opinion matters to us! Help us improve our
                        services.
                    </p>{" "}
                </div>

                {/* Suggested Feedback Section */}
                <div className="w-full mb-6 md:mb-8">
                    <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
                        <FaLightbulb className="text-yellow-400 h-4 w-4 md:h-5 md:w-5" />
                        <h3 className="text-blue-300 font-medium text-base md:text-lg">
                            Quick Feedback Suggestions
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {suggestedFeedbacks.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    handleSuggestedFeedback(suggestion)
                                }
                                className="text-left bg-slate-600/50 hover:bg-slate-500/50 border border-slate-500 rounded-lg p-3 transition-all duration-300 text-sm md:text-base flex items-start group"
                            >
                                <FaTags className="h-3 w-3 md:h-4 md:w-4 text-blue-400 mt-1 mr-2 shrink-0 group-hover:text-yellow-400" />
                                <span className="text-gray-200 group-hover:text-white">
                                    {suggestion.text}
                                </span>
                                <div className="ml-auto pl-2 flex shrink-0">
                                    {[...Array(suggestion.rating)].map(
                                        (_, i) => (
                                            <FaStar
                                                key={i}
                                                className="h-2 w-2 md:h-3 md:w-3 text-yellow-400"
                                            />
                                        )
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center md:text-left">
                        Click any suggestion to use it as your feedback
                    </p>
                </div>

                {/* Feedback Form */}
                <div className="w-full bg-slate-700/50 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-2xl border border-slate-600">
                    {error && (
                        <div className="bg-red-900/40 border-l-4 border-red-500 text-red-100 p-3 md:p-4 rounded-md mb-4 md:mb-6 text-sm md:text-base">
                            {String(error)}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-900/40 border-l-4 border-green-500 text-green-100 p-3 md:p-4 rounded-md mb-4 md:mb-6 text-sm md:text-base">
                            {String(success)}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 md:space-y-8"
                    >
                        <div>
                            <label className="block text-blue-300 font-medium mb-2 text-base md:text-lg">
                                Your Feedback:
                            </label>
                            <textarea
                                className="w-full p-3 md:p-4 bg-slate-600 text-white border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm md:text-base"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us what you think about our service..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-blue-300 font-medium mb-2 text-base md:text-lg">
                                Rate Your Experience:
                            </label>
                            <div className="bg-slate-600/70 p-3 md:p-6 rounded-lg border border-slate-500">
                                <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-2 md:gap-0">
                                    {emojiRatings.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:scale-110 p-2 ${rating === index + 1
                                                ? "scale-110"
                                                : ""
                                                }`}
                                            onClick={() => setRating(index + 1)}
                                        >
                                            <span
                                                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 ${rating === index + 1
                                                    ? "opacity-100"
                                                    : "opacity-60 hover:opacity-90"
                                                    }`}
                                            >
                                                {item.emoji}
                                            </span>
                                            <span
                                                className={`text-xs md:text-sm text-center ${rating === index + 1
                                                    ? "text-blue-300 font-medium"
                                                    : "text-gray-400"
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                            <div className="mt-1 md:mt-2 flex">
                                                {[...Array(index + 1)].map(
                                                    (_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={`h-2 w-2 md:h-3 md:w-3 ${rating ===
                                                                index + 1
                                                                ? "text-yellow-400"
                                                                : "text-gray-500"
                                                                }`}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>{" "}
                        <button
                            id="submit-button"
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/50 text-sm md:text-base"
                        >
                            <FaPaperPlane className="h-4 w-4 md:h-5 md:w-5" />
                            <span>Submit Feedback</span>
                        </button>
                    </form>
                </div>

                {/* CTA Section */}
                <CallToAction />

                {/* Testimonial or thank you message */}
                <div className="mt-8 md:mt-12 text-center px-2">
                    <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-2 md:mb-3">
                        Thank You for Your Valuable Input
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                        Your feedback helps us improve our educational resources
                        and deliver a better experience for all students and
                        educators using The College Notes Hub.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Designed and developed with ❤️ to support educational
                        excellence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
