import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../Components/StaticBreadCrum";

const Topics = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const subject = queryParams.get("subject") || "Subject";
    const topics = [
        "Introduction to React",
        "Components and Props",
        "State and Lifecycle",
        "React Hooks",
        "React Router",
        "Performance Optimization",
    ];

    return (
        <div className="p-5 bg-slate-800 w-full h-screen text-white">
            <Breadcrumb />
            <h1 className="text-3xl font-bold text-center mt-5">
                {subject} - Topics
            </h1>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className="bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-600 transition duration-200"
                        onClick={() =>
                            navigate(`/notes?subject=${subject}&topic=${topic}`)
                        }
                    >
                        <h2 className="text-lg font-semibold">{topic}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Topics;
