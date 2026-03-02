/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SemesterHeader from "./Components/SemesterHeader";
import BranchDetails from "./Components/BranchDetails";
import SemesterCard from "./Components/SemesterCard";
import EmptySemesterList from "./Components/EmptySemesterList";
import { SemesterLoading, SemesterError } from "./Components/SemesterStates";
import API from "../Api/axiosInstance";

const Semester = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [semesters, setSemesters] = useState([]);

    // Extract branch and course from query parameters
    const queryParams = new URLSearchParams(location.search);
    const branch = queryParams.get("branch") || "Branch";
    const course = queryParams.get("course") || "Course";
    const session = queryParams.get("session") || "Session";
    const branchId = queryParams.get("branchId") || "";
    const courseId = queryParams.get("courseId") || "";

    // Fetch semesters from API
    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                let url = "/academic/semesters";
                if (courseId) url += `?course=${courseId}`;

                const { data } = await API.get(url);
                const mapped = data.map((s) => ({
                    name: s.name,
                    route: `${s.number}`,
                    subjects: 0,
                    description: "",
                    _id: s._id,
                    number: s.number,
                }));
                setSemesters(mapped);
            } catch (err) {
                console.error("Failed to fetch semesters:", err);
                setError("Failed to fetch semesters. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSemesters();
    }, [courseId]);

    if (loading) {
        return <SemesterLoading />;
    }

    if (error) {
        return <SemesterError error={error} />;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white pb-16">
            <SemesterHeader branch={branch} course={course} session={session} />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <BranchDetails
                    branch={branch}
                    course={course}
                    session={session}
                />

                {/* Semesters Grid */}
                {semesters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {semesters.map((semester, index) => (
                            <SemesterCard
                                key={semester._id || index}
                                semester={semester}
                                branch={branch}
                                branchId={branchId}
                                course={course}
                                session={session}
                                courseId={courseId}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptySemesterList course={course} session={session} />
                )}
            </div>
        </div>
    );
};

export default Semester;
