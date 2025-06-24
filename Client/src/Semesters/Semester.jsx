/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SemesterHeader from "./Components/SemesterHeader";
import BranchDetails from "./Components/BranchDetails";
import SemesterCard from "./Components/SemesterCard";
import EmptySemesterList from "./Components/EmptySemesterList";
import { SemesterLoading, SemesterError } from "./Components/SemesterStates";

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
        return <SemesterLoading />;
    }

    if (error) {
        return <SemesterError error={error} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
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
                                key={index}
                                semester={semester}
                                branch={branch}
                                course={course}
                                session={session}
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
