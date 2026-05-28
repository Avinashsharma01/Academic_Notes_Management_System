import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SubjectsHeader from "./Components/SubjectsHeader";
import SemesterDetails from "./Components/SemesterDetails";
import SubjectCard from "./Components/SubjectCard";
import EmptySubjectsList from "./Components/EmptySubjectsList";
import { SubjectsLoading, SubjectsError } from "./Components/SubjectsStates";
import API from "../Api/axiosInstance";

const Subjects = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState([]);

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();

    // Extract semester, branch, and course from query parameters
    const queryParams = new URLSearchParams(location.search);
    const semester = queryParams.get("semester") || "Semester";
    const branch = queryParams.get("branch") || "Branch";
    const course = queryParams.get("course") || "Course";
    const session = queryParams.get("session") || "Session";
    const branchId = queryParams.get("branchId") || "";
    const semesterId = queryParams.get("semesterId") || "";

    // Fetch subjects from API
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                let url = "/academic/subjects?";
                const params = [];
                if (branchId) params.push(`branch=${branchId}`);
                if (semesterId) params.push(`semester=${semesterId}`);
                url += params.join("&");

                const { data } = await API.get(url);
                // Map to the format SubjectCard expects (just name strings or objects)
                const mapped = data.map((s) => s.name);
                setSubjects(mapped);
            } catch (err) {
                console.error("Failed to fetch subjects:", err);
                setError("Failed to fetch subjects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [branchId, semesterId]);

    if (loading) {
        return <SubjectsLoading />;
    }

    if (error) {
        return <SubjectsError error={error} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            <SubjectsHeader
                semester={semester}
                branch={branch}
                course={course}
                session={session}
            />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <SemesterDetails
                    semester={semester}
                    branch={branch}
                    course={course}
                    session={session}
                />

                {/* Subjects Grid */}
                {subjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((subject, index) => (
                            <SubjectCard
                                key={index}
                                subject={subject}
                                semester={semester}
                                branch={branch}
                                course={course}
                                session={session}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptySubjectsList
                        branch={branch}
                        course={course}
                        session={session}
                    />
                )}
            </div>
        </div>
    );
};

export default Subjects;
