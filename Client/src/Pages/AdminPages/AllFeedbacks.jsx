import { useContext, useEffect, useState } from "react";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";
import {
    FaStar,
    FaTrash,
    FaClock,
    FaUser,
    FaSpinner,
    FaExclamationCircle,
    FaFilter,
    FaSearch,
} from "react-icons/fa";

const AllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterRating, setFilterRating] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const { AdminToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchFeedback = async () => {
            setLoading(true);
            try {
                const token = AdminToken;

                if (!token) {
                    console.error("No token available");
                    setError("Authentication error. Please login again.");
                    setLoading(false);
                    return;
                }

                // Fetch feedback from API
                const { data } = await API.get("/feedback", {
                    headers: {
                        Authorization: token,
                    },
                });

                setFeedbacks(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                setError("Failed to load feedback. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchFeedback();
    }, [AdminToken]);

    // delete the feedback
    const handleDelete = async (id) => {
        try {
            const token = AdminToken;

            if (!token) {
                console.error("No token available");
                setError("Authentication error. Please login again.");
                return;
            }

            await API.delete(`/feedback/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            // Remove the deleted feedback from the state
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (error) {
            console.error("Error deleting feedback:", error);
            setError("Failed to delete feedback. Please try again.");
        }
    };

    // Filter feedbacks based on rating and search term
    const filteredFeedbacks = feedbacks
        .filter(
            (feedback) => filterRating === 0 || feedback.rating === filterRating
        )
        .filter(
            (feedback) =>
                searchTerm === "" ||
                (feedback.user?.name &&
                    feedback.user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())) ||
                feedback.message
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Header */}
            <div className="bg-gray-800 p-6 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white">
                        User Feedback
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Review and manage all user feedback submissions
                    </p>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto p-6">
                {/* Filters and search */}
                <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center flex-col gap-2">
                            <FaFilter className="text-blue-400" />
                            <span className="text-gray-300">
                                Filter by rating:
                            </span>
                            <div className="flex space-x-2 ">
                                {[0, 1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => setFilterRating(rating)}
                                        className={`px-3 py-1 rounded-md transition-colors ${
                                            filterRating === rating
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                    >
                                        {rating === 0 ? "All" : `${rating}★`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search feedback..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Status indicators */}
                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <FaSpinner className="animate-spin text-4xl text-blue-500" />
                        <span className="ml-3 text-gray-300">
                            Loading feedback...
                        </span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded-lg flex items-center">
                        <FaExclamationCircle className="mr-2" />
                        {error}
                    </div>
                )}

                {/* Feedback cards */}
                {!loading && !error && (
                    <>
                        <div className="mb-4 text-gray-400">
                            Showing {filteredFeedbacks.length}{" "}
                            {filteredFeedbacks.length === 1
                                ? "feedback"
                                : "feedbacks"}
                        </div>

                        {filteredFeedbacks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredFeedbacks.map((feedback) => (
                                    <div
                                        key={feedback._id}
                                        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-gray-600 transition-all"
                                    >
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center">
                                                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                                                        <FaUser className="text-blue-400" />
                                                    </div>
                                                    <h2 className="text-lg font-semibold text-blue-300">
                                                        {feedback.user?.name ||
                                                            "Anonymous User"}
                                                    </h2>
                                                </div>
                                                <div className="flex">
                                                    {Array.from(
                                                        { length: 5 },
                                                        (_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={`${
                                                                    i <
                                                                    feedback.rating
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-600"
                                                                }`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                                                <p className="text-gray-200">
                                                    {feedback.message}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center text-sm">
                                                <div className="flex items-center text-gray-400">
                                                    <FaClock className="mr-1" />
                                                    <span>
                                                        {new Date(
                                                            feedback.createdAt
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                                <button
                                                    className="flex items-center bg-red-900/30 hover:bg-red-900/50 text-red-300 hover:text-red-200 px-3 py-1 rounded-lg transition-colors"
                                                    onClick={() =>
                                                        handleDelete(
                                                            feedback._id
                                                        )
                                                    }
                                                >
                                                    <FaTrash className="mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-800/50 rounded-xl p-10 text-center border border-gray-700">
                                <p className="text-gray-400 text-lg">
                                    No feedback available matching your
                                    criteria.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllFeedbacks;
