/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import { FaBook, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const Semester = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract branch and course from query parameters
    const queryParams = new URLSearchParams(location.search);
    const branch = queryParams.get("branch") || "Branch";
    const course = queryParams.get("course") || "Course";
    const session = queryParams.get("session") || "Session";

    // List of semesters (can be fetched from an API)
    const [semesters, setSemesters] = useState([]);

    // Helper function to get a color for a specific semester
    const getSemesterColor = (index) => {
        const colors = [
            "from-blue-500 to-blue-600",
            "from-purple-500 to-purple-600",
            "from-green-500 to-green-600",
            "from-red-500 to-red-600",
            "from-yellow-500 to-yellow-600",
            "from-indigo-500 to-indigo-600",
            "from-pink-500 to-pink-600",
            "from-teal-500 to-teal-600",
        ];
        return colors[index % colors.length];
    };

    // Simulate fetching semester data from an API
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                const data = [
                    {
                        name: "Semester 1",
                        route: "1st",
                        subjects: 8,
                        description:
                            "Foundational courses for first-year students",
                    },
                    {
                        name: "Semester 2",
                        route: "2nd",
                        subjects: 7,
                        description: "Continuation of core fundamentals",
                    },
                    {
                        name: "Semester 3",
                        route: "3rd",
                        subjects: 8,
                        description: "Introduction to specialized topics",
                    },
                    {
                        name: "Semester 4",
                        route: "4th",
                        subjects: 6,
                        description: "Advanced concepts and applications",
                    },
                    {
                        name: "Semester 5",
                        route: "5th",
                        subjects: 7,
                        description:
                            "Specialization and industry-relevant skills",
                    },
                    {
                        name: "Semester 6",
                        route: "6th",
                        subjects: 6,
                        description: "Advanced professional courses",
                    },
                    {
                        name: "Semester 7",
                        route: "7th",
                        subjects: 5,
                        description: "Final year specialization and projects",
                    },
                    {
                        name: "Semester 8",
                        route: "8th",
                        subjects: 4,
                        description:
                            "Capstone projects and industry preparation",
                    },
                ];
                setSemesters(data);
            } catch (err) {
                setError("Failed to fetch semesters. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSemesters();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-blue-600 text-xl font-semibold">
                        Loading semesters...
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
                        Select Your Semester
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Choose a semester for{" "}
                        <span className="font-semibold">
                            {branch.toUpperCase()}
                        </span>{" "}
                        branch under{" "}
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
                                Branch Details
                            </h2>
                            <p className="text-gray-600">
                                Viewing semesters for{" "}
                                <span className="font-semibold text-blue-600">
                                    {branch.toUpperCase()}
                                </span>{" "}
                                in{" "}
                                <span className="font-semibold text-blue-600">
                                    {course.toUpperCase()}
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                navigate(
                                    `/branch?course=${course}&session=${session}`
                                )
                            }
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            Change Branch
                            <FaArrowRight className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Semesters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {semesters.map((semester, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                navigate(
                                    `/subjects?semester=${semester.route}&branch=${branch}&course=${course}&session=${session}`
                                )
                            }
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
                        >
                            <div
                                className={`bg-gradient-to-r ${getSemesterColor(
                                    index
                                )} p-6 flex justify-center items-center text-white`}
                            >
                                <FaCalendarAlt size={36} />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {semester.name}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {semester.description}
                                </p>

                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                    <span>{semester.subjects} Subjects</span>
                                    <span>{semester.route} Term</span>
                                </div>

                                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    Explore Subjects
                                    <FaArrowRight className="text-xs" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {semesters.length === 0 && (
                    <div className="bg-white rounded-xl p-8 text-center shadow-md">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl mx-auto mb-4">
                            <FaBook size={28} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            No Semesters Available
                        </h2>
                        <p className="text-gray-600 mb-6">
                            There are no semesters available for this branch
                            yet.
                        </p>
                        <button
                            onClick={() =>
                                navigate(
                                    `/branch?course=${course}&session=${session}`
                                )
                            }
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Branches
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Semester;
