import { useContext, useEffect, useState } from "react";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";

const AllFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const { AdminToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const token = AdminToken;

                if (!token) {
                    console.error("No token available");
                    return;
                }

                // Fetch feedback from API
                const { data } = await API.get("/feedback", {
                    headers: {
                        Authorization: token, // Include the token in the headers
                    },
                });

                setFeedbacks(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
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
                return;
            }

            await API.delete(`/feedback/${id}`, {
                headers: {
                    Authorization: token, // Include the token in the headers for admin accesss
                },
            });

            // Remove the deleted feedback from the state
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    return (
        <div className="p-10 bg-gray-800 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">
                📢 User Feedback
            </h1>

            {feedbacks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feedbacks.map((feedback) => (
                        <div
                            key={feedback._id}
                            className="bg-gray-700 p-5 rounded-lg shadow-md"
                        >
                            <h2 className="text-lg font-semibold text-blue-300">
                                {feedback.user?.name || "Admin"}
                            </h2>
                            <p className="text-gray-300 mt-2">
                                {feedback.message}
                            </p>
                            <div className="mt-3 flex items-center">
                                {Array.from(
                                    { length: feedback.rating },
                                    (_, i) => (
                                        <span
                                            key={i}
                                            className="text-yellow-400 text-xl"
                                        >
                                            ⭐
                                        </span>
                                    )
                                )}
                            </div>
                            <div className="deleteAndTimeBox flex justify-between items-center">
                                <p className="text-gray-400 text-sm mt-2">
                                    🕒{" "}
                                    {new Date(
                                        feedback.createdAt
                                    ).toLocaleString()}
                                </p>
                                <button
                                    className="bg-red-600 text-white px-4 rounded-2xl cursor-pointer"
                                    onClick={() => handleDelete(feedback._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">
                    No feedback available.
                </p>
            )}
        </div>
    );
};

export default AllFeedbacks;
