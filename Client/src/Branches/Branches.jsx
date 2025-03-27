/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import StaticBreadCrum from "../Components/StaticBreadCrum";

const Branches = () => {
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
            <div className="flex justify-center items-center h-screen bg-slate-800">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-800">
                <div className="text-red-500 text-2xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-5 bg-slate-300 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <div className="breadcrum max-w-7xl mx-auto w-full flex justify-between items-center">
                    <Breadcrumb />
                    {/* <StaticBreadCrum /> */}
                </div>
                <h1 className="text-3xl font-bold text-center mb-4">
                    Select Your Branch
                </h1>
                <p className="text-center text-black mb-8">
                    Choose a branch under{" "}
                    <span className="font-semibold text-blue-400">
                        {course.toUpperCase()}
                    </span>
                </p>

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
                            className="bg-gray-700 p-6 rounded-lg cursor-pointer transition-all hover:bg-gray-600 hover:scale-105 transform ease-in-out duration-300"
                        >
                            <h2 className="text-xl font-semibold text-center">
                                {branch.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Branches;
