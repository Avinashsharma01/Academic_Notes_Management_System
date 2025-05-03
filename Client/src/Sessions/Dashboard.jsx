/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import StaticBreadCrum from "../Components/StaticBreadCrum";
import {
    FaBook,
    FaGraduationCap,
    FaCalendarAlt,
    FaChevronRight,
} from "react-icons/fa";

const Dashboard = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                // we will fetch the api here for the real data
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 500));
                const data = [
                    {
                        year: 2020,
                        courses: 10,
                        notes: 120,
                        startYear: 2020,
                        endYear: 2024,
                    },
                    {
                        year: 2021,
                        courses: 12,
                        notes: 140,
                        startYear: 2021,
                        endYear: 2025,
                    },
                    {
                        year: 2022,
                        courses: 15,
                        notes: 160,
                        startYear: 2022,
                        endYear: 2026,
                    },
                    {
                        year: 2023,
                        courses: 18,
                        notes: 180,
                        startYear: 2023,
                        endYear: 2027,
                    },
                    {
                        year: 2024,
                        courses: 20,
                        notes: 200,
                        startYear: 2024,
                        endYear: 2028,
                    },
                    {
                        year: 2025,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2029,
                    },
                    {
                        year: 2026,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2030,
                    },
                    {
                        year: 2027,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2031,
                    },
                    {
                        year: 2028,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2032,
                    },
                ];
                setSessions(data);
            } catch (err) {
                setError("Failed to fetch sessions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
                <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-blue-600 text-xl font-semibold">
                        Loading sessions...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
                <div className="p-8 rounded-lg bg-white shadow-lg text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto mb-4">
                        !
                    </div>
                    <div className="text-red-500 text-xl font-semibold mb-2">
                        Error
                    </div>
                    <p className="text-gray-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative">
                {/* Fixed positioning for breadcrumb to prevent overlap */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 mb-6">
                    <Breadcrumb />
                </div>

                <div className="max-w-7xl mx-auto mt-4 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Academic Sessions
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Browse through available academic sessions and explore
                        courses, notes, and resources for each year.
                    </p>
                </div>

                {/* Decorative elements with lower z-index to ensure they don't overlap content */}
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full -mb-36 -mr-36 z-0"></div>
                <div className="absolute top-12 right-32 w-16 h-16 bg-white/5 rounded-full z-0"></div>
                <div className="absolute bottom-12 left-16 w-24 h-24 bg-white/5 rounded-full z-0"></div>
            </div>

            {/* Main content with increased top margin to prevent overlap with header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                {/* Stats Bar */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                            <FaCalendarAlt size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Sessions
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {sessions.length}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4">
                            <FaGraduationCap size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Courses
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                                {sessions.reduce(
                                    (total, session) => total + session.courses,
                                    0
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                            <FaBook size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Notes</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {sessions.reduce(
                                    (total, session) => total + session.notes,
                                    0
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Session Cards - improved spacing with better padding */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sessions.map((session) => (
                        <div
                            key={session.year}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div
                                className={`h-3 ${getColorForYear(
                                    session.year
                                )}`}
                            ></div>
                            <div className="p-5 sm:p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                        {session.year}
                                    </h2>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${getYearStatusBadge(
                                            session.year
                                        )}`}
                                    >
                                        {getYearStatus(session.year)}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center">
                                        <FaGraduationCap className="text-purple-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm sm:text-base">
                                            <span className="font-medium">
                                                {session.courses}
                                            </span>{" "}
                                            Courses Available
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaBook className="text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm sm:text-base">
                                            <span className="font-medium">
                                                {session.notes}
                                            </span>{" "}
                                            Notes Uploaded
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="text-blue-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm sm:text-base">
                                            <span className="font-medium">
                                                {session.startYear} -{" "}
                                                {session.endYear}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/courses?session=${session.year}`
                                        )
                                    }
                                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors flex items-center justify-center"
                                >
                                    Explore Courses
                                    <FaChevronRight
                                        className="ml-2"
                                        size={14}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Helper function to get a color for a specific year
const getColorForYear = (year) => {
    const colors = [
        "bg-blue-600",
        "bg-purple-600",
        "bg-green-600",
        "bg-red-600",
        "bg-yellow-600",
        "bg-indigo-600",
        "bg-pink-600",
        "bg-teal-600",
        "bg-orange-600",
    ];
    return colors[year % colors.length];
};

// Helper function to determine status based on current year
const getYearStatus = (year) => {
    const currentYear = new Date().getFullYear();

    if (year < currentYear) {
        return "Completed";
    } else if (year === currentYear) {
        return "Current";
    } else {
        return "Upcoming";
    }
};

// Helper function to get badge styling based on status
const getYearStatusBadge = (year) => {
    const status = getYearStatus(year);

    if (status === "Completed") {
        return "bg-green-100 text-green-800";
    } else if (status === "Current") {
        return "bg-blue-100 text-blue-800";
    } else {
        return "bg-gray-100 text-gray-800";
    }
};

export default Dashboard;
