/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import {
    FaArrowRight,
    FaCode,
    FaServer,
    FaRobot,
    FaBuilding,
    FaPlug,
    FaMicrochip,
    FaBolt,
    FaTshirt,
} from "react-icons/fa";

const Branches = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract course name from query parameters
    const queryParams = new URLSearchParams(location.search);
    const course = queryParams.get("course") || "Course"; // Default value
    const session = queryParams.get("session") || "Session";

    // List of Branches (can be fetched from an API)
    const [branches, setBranches] = useState([]);

    // Get icon based on branch code
    const getBranchIcon = (route) => {
        const icons = {
            it: <FaServer size={36} />,
            cse: <FaCode size={36} />,
            alml: <FaRobot size={36} />,
            civil: <FaBuilding size={36} />,
            eee: <FaPlug size={36} />,
            ece: <FaMicrochip size={36} />,
            ee: <FaBolt size={36} />,
            ft: <FaTshirt size={36} />,
        };
        return icons[route] || <FaCode size={36} />;
    };

    // Get color based on branch code
    const getBranchColor = (route) => {
        const colors = {
            it: "from-blue-500 to-blue-600",
            cse: "from-indigo-500 to-indigo-600",
            alml: "from-purple-500 to-purple-600",
            civil: "from-amber-500 to-amber-600",
            eee: "from-yellow-500 to-yellow-600",
            ece: "from-red-500 to-red-600",
            ee: "from-orange-500 to-orange-600",
            ft: "from-emerald-500 to-emerald-600",
        };
        return colors[route] || "from-blue-500 to-blue-600";
    };

    // Get branch description
    const getBranchDescription = (route) => {
        const descriptions = {
            it: "Information Technology",
            cse: "Computer Science & Engineering",
            alml: "Artificial Intelligence & Machine Learning",
            civil: "Civil Engineering",
            eee: "Electrical & Electronics Engineering",
            ece: "Electronics & Communication Engineering",
            ee: "Electrical Engineering",
            ft: "Fashion Technology",
        };
        return descriptions[route] || "";
    };

    // Simulate fetching branch data from an API
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                // this is used for Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 500));
                const data = [
                    { name: "IT", route: "it" },
                    { name: "CSE", route: "cse" },
                    { name: "AI/ML", route: "alml" },
                    { name: "CIVIL", route: "civil" },
                    { name: "EEE", route: "eee" },
                    { name: "ECE", route: "ece" },
                    { name: "EE", route: "ee" },
                    { name: "F.TECH", route: "ft" },
                ];
                setBranches(data);
            } catch (err) {
                setError("Failed to fetch branches. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-blue-600 text-xl font-semibold">
                        Loading branches...
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative">
                {/* Breadcrumb */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 mb-6">
                    <Breadcrumb />
                </div>

                <div className="max-w-7xl mx-auto mt-4 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Select Your Branch
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Choose a branch under{" "}
                        <span className="font-semibold">
                            {course.toUpperCase()}
                        </span>{" "}
                        for the {session} academic session.
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
                                Course Details
                            </h2>
                            <p className="text-gray-600">
                                Viewing branches for{" "}
                                <span className="font-semibold text-blue-600">
                                    {course.toUpperCase()}
                                </span>{" "}
                                in the{" "}
                                <span className="font-semibold text-blue-600">
                                    {session}
                                </span>{" "}
                                session
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                navigate(`/courses?session=${session}`)
                            }
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            Change Course
                            <FaArrowRight className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* Branches Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {branches.map((branch) => (
                        <div
                            key={branch.route}
                            onClick={() =>
                                navigate(
                                    `/semester?branch=${branch.route}&course=${course}&session=${session}`
                                )
                            }
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
                        >
                            <div
                                className={`bg-gradient-to-r ${getBranchColor(
                                    branch.route
                                )} p-6 flex justify-center items-center text-white`}
                            >
                                {getBranchIcon(branch.route)}
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {branch.name}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    {getBranchDescription(branch.route)}
                                </p>

                                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    Explore Semesters
                                    <FaArrowRight className="text-xs" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {branches.length === 0 && (
                    <div className="bg-white rounded-xl p-8 text-center shadow-md">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl mx-auto mb-4">
                            <FaCode size={28} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            No Branches Available
                        </h2>
                        <p className="text-gray-600 mb-6">
                            There are no branches available for this course yet.
                        </p>
                        <button
                            onClick={() =>
                                navigate(`/courses?session=${session}`)
                            }
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Branches;
