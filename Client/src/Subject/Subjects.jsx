/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import {
    FaArrowRight,
    FaBook,
    FaLaptopCode,
    FaChalkboardTeacher,
    FaDatabase,
    FaServer,
    FaNetworkWired,
} from "react-icons/fa";

const Subjects = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract semester, branch, and course from query parameters
    const queryParams = new URLSearchParams(location.search);
    const semester = queryParams.get("semester") || "Semester";
    const branch = queryParams.get("branch") || "Branch";
    const course = queryParams.get("course") || "Course";
    const session = queryParams.get("session") || "Session";

    // List of subjects (can be fetched from an API)
    const [subjects, setSubjects] = useState([]);

    // Map of subject names to icons and colors
    const subjectIcons = {
        "Big Data Analytics": <FaLaptopCode size={32} />,
        "Deep Learning": <FaNetworkWired size={32} />,
        "Cloud Computer": <FaServer size={32} />,
        "Programming Fundamentals": <FaLaptopCode size={32} />,
        "Data Structures": <FaDatabase size={32} />,
        Algorithms: <FaLaptopCode size={32} />,
        "Database Systems": <FaDatabase size={32} />,
        "Operating Systems": <FaServer size={32} />,
    };

    // Get a color for a specific subject
    const getSubjectColor = (subject) => {
        const colors = {
            "Big Data Analytics": "from-indigo-500 to-indigo-600",
            "Deep Learning": "from-blue-500 to-blue-600",
            "Cloud Computer": "from-sky-500 to-sky-600",
            "Programming Fundamentals": "from-green-500 to-green-600",
            "Data Structures": "from-purple-500 to-purple-600",
            Algorithms: "from-red-500 to-red-600",
            "Database Systems": "from-amber-500 to-amber-600",
            "Operating Systems": "from-teal-500 to-teal-600",
        };
        return colors[subject] || "from-gray-600 to-gray-700";
    };

    // Get subject descriptions
    const getSubjectDescription = (subject) => {
        const descriptions = {
            "Big Data Analytics":
                "Learn about lexical analysis, parsing, and code generation",
            "Deep Learning":
                "Study network architecture, protocols, and communication systems",
            "Cloud Computer":
                "Explore distributed computing resources and services",
            "Programming Fundamentals":
                "Master the basic concepts of programming and logic",
            "Data Structures":
                "Study efficient data organization, storage, and retrieval",
            Algorithms: "Learn algorithm design, analysis, and implementation",
            "Database Systems":
                "Explore database design, management, and optimization",
            "Operating Systems":
                "Study process management, memory allocation, and file systems",
        };
        return descriptions[subject] || "Course description coming soon";
    };

    // Simulate fetching subject data from an API
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                const data = [
                    "Big Data Analytics",
                    "Deep Learning",
                    "Cloud Computer",
                    "Programming Fundamentals",
                    "Data Structures",
                    "Algorithms",
                    "Database Systems",
                    "Operating Systems",
                ];
                setSubjects(data);
            } catch (err) {
                setError("Failed to fetch subjects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-blue-600 text-xl font-semibold">
                        Loading subjects...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto mb-4">
                        !
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Error
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            {/* Header with background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative overflow-hidden">
                {/* Breadcrumb */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 mb-6">
                    <Breadcrumb />
                </div>

                <div className="max-w-7xl mx-auto mt-4 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Select Your Subject
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Choose a subject for{" "}
                        <span className="font-semibold">
                            {branch.toUpperCase()}
                        </span>{" "}
                        branch in{" "}
                        <span className="font-semibold">{semester}</span>{" "}
                        semester under{" "}
                        <span className="font-semibold">
                            {course.toUpperCase()}
                        </span>{" "}
                        for the {session} session.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full -mb-36 -mr-36 z-0"></div>
                <div className="absolute top-12 right-32 w-16 h-16 bg-white/5 rounded-full z-0"></div>
                <div className="absolute bottom-12 left-16 w-24 h-24 bg-white/5 rounded-full z-0"></div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Semester Details
                            </h2>
                            <p className="text-gray-600">
                                Viewing subjects for{" "}
                                <span className="font-semibold text-blue-600">
                                    {semester}
                                </span>{" "}
                                semester in{" "}
                                <span className="font-semibold text-blue-600">
                                    {branch.toUpperCase()}
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                navigate(
                                    `/semester?branch=${branch}&course=${course}&session=${session}`
                                )
                            }
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            Change Semester
                            <FaArrowRight className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                navigate(
                                    `/notes?subject=${subject}&semester=${semester}&branch=${branch}&course=${course}&session=${session}`
                                )
                            }
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
                        >
                            <div
                                className={`bg-gradient-to-r ${getSubjectColor(
                                    subject
                                )} p-6 flex justify-center items-center text-white`}
                            >
                                {subjectIcons[subject] || <FaBook size={32} />}
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-3">
                                    {subject}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {getSubjectDescription(subject)}
                                </p>

                                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    View Notes
                                    <FaArrowRight className="text-xs" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {subjects.length === 0 && (
                    <div className="bg-white rounded-xl p-8 text-center shadow-md">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl mx-auto mb-4">
                            <FaBook size={28} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            No Subjects Available
                        </h2>
                        <p className="text-gray-600 mb-6">
                            There are no subjects available for this semester
                            yet.
                        </p>
                        <button
                            onClick={() =>
                                navigate(
                                    `/semester?branch=${branch}&course=${course}&session=${session}`
                                )
                            }
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Semesters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subjects;
