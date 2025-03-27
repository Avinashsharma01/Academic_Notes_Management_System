/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import StaticBreadCrum from "../Components/StaticBreadCrum";

const Semester = () => {
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

    // Simulate fetching semester data from an API
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                const data = [
                    { name: "Semester 1", route: "1st" },
                    { name: "Semester 2", route: "2nd" },
                    { name: "Semester 3", route: "3rd" },
                    { name: "Semester 4", route: "4th" },
                    { name: "Semester 5", route: "5th" },
                    { name: "Semester 6", route: "6th" },
                    { name: "Semester 7", route: "7th" },
                    { name: "Semester 8", route: "8th" },
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
                    Select Your Semester
                </h1>
                <p className="text-center text-black mb-8">
                    Choose a semester for{" "}
                    <span className="font-semibold text-blue-400">
                        {branch.toUpperCase()}
                    </span>{" "}
                    under{" "}
                    <span className="font-semibold text-blue-400">
                        {course.toUpperCase()}
                    </span>
                </p>

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
                            className="bg-gray-700 p-6 rounded-lg cursor-pointer transition-all hover:bg-gray-600 hover:scale-105 transform ease-in-out duration-300 text-center"
                        >
                            <h2 className="text-xl font-semibold">
                                {semester.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Semester;
