/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import StaticBreadCrum from "../Components/StaticBreadCrum";

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

    // List of subjects (can be fetched from an API)
    const [subjects, setSubjects] = useState([]);

    // Simulate fetching subject data from an API
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                const data = [
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Programming Fundamentals",
                    "Data Structures",
                    "Algorithms",
                    "Database Management",
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
        <div className="p-5 bg-slate-800 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <div className="breadcrum max-w-7xl mx-auto w-full flex justify-between items-center">
                    <Breadcrumb />
                    {/* <StaticBreadCrum /> */}
                </div>
                <h1 className="text-3xl font-bold text-center mb-4">
                    Select Your Subject
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Choose a subject for{" "}
                    <span className="font-semibold text-blue-400">
                        {branch.toUpperCase()}
                    </span>{" "}
                    under{" "}
                    <span className="font-semibold text-blue-400">
                        {course}
                    </span>{" "}
                    (Semester {semester})
                </p>

                {/* Subjects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subjects.map((subject, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                navigate(
                                    `/notes?subject=${subject}&semester=${semester}&branch=${branch}&course=${course}`
                                )
                            }
                            className="bg-gray-700 p-6 rounded-lg cursor-pointer transition-all hover:bg-gray-600 hover:scale-105 transform ease-in-out duration-300 text-center"
                        >
                            <h2 className="text-xl font-semibold">{subject}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subjects;
