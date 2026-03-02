/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CoursesHeader from "./Components/CoursesHeader";
import SessionDetails from "./Components/SessionDetails";
import CourseCard from "./Components/CourseCard";
import EmptyCoursesList from "./Components/EmptyCoursesList";
import { CoursesLoading, CoursesError } from "./Components/CoursesStates";
import API from "../Api/axiosInstance";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const session = queryParams.get("session") || "Session";

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await API.get("/academic/courses");
                // Map API data to match the expected format
                const mapped = data.map((c) => ({
                    id: c._id,
                    name: c.name,
                    description: c.description,
                    route: c.code,
                    icon: c.icon || "graduation-cap",
                    color: c.color || "blue",
                    departments: 0,
                    students: 0,
                }));
                setCourses(mapped);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
                setError("Failed to fetch courses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <CoursesLoading />;
    }

    if (error) {
        return <CoursesError error={error} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            <CoursesHeader session={session} />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <SessionDetails session={session} />

                {/* Courses Grid */}
                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                session={session}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCoursesList />
                )}
            </div>
        </div>
    );
};

export default Courses;
