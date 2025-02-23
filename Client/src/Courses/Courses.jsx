/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import StaticBreadCrum from "../Components/StaticBreadCrum";

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const session = queryParams.get("session") || "Session";

    // Simulate fetching course data from an API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 500));
                const data = [
                    { name: "B-TECH", route: "b.tech" },
                    { name: "BCA", route: "bca" },
                    { name: "MCA", route: "mca" },
                    { name: "DIPLOMA", route: "diploma" },
                ];
                setCourses(data);
            } catch (err) {
                setError("Failed to fetch courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
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
                    Select Your Course
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Choose a course from session
                    <span className="font-semibold text-blue-400">
                        {" "}
                        {session}
                    </span>{" "}
                    to view notes and resources
                </p>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.route}
                            onClick={() =>
                                navigate(
                                    `/branch?course=${course.route}&session=${session}`
                                )
                            }
                            className="bg-gray-700 p-6 rounded-lg cursor-pointer transition-all hover:bg-gray-600 hover:scale-105 transform ease-in-out duration-300"
                        >
                            <h2 className="text-xl font-semibold text-center">
                                {course.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
