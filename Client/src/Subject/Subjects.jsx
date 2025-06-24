import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SubjectsHeader from "./Components/SubjectsHeader";
import SemesterDetails from "./Components/SemesterDetails";
import SubjectCard from "./Components/SubjectCard";
import EmptySubjectsList from "./Components/EmptySubjectsList";
import { SubjectsLoading, SubjectsError } from "./Components/SubjectsStates";
import subjectListData from "./SubJectList.js";

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
    const session = queryParams.get("session") || "Session"; // Fetch subject data based on the selected semester
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 500));

                // Parse semester number from the semester string or default to 1
                let semesterNum = 1;
                if (semester && semester !== "Semester") {
                    // Extract numeric part from strings like "Semester 3"
                    const match = semester.match(/\d+/);
                    if (match) {
                        semesterNum = parseInt(match[0], 10);
                    }
                }

                // Find the subjects for the selected semester from the imported data
                const semesterData = subjectListData.find(
                    (item) => item.semester === semesterNum
                );

                if (semesterData && semesterData.subjects) {
                    setSubjects(semesterData.subjects);
                } else {
                    // If no subjects found for the semester, show empty array
                    setSubjects([]);
                }
            } catch (err) {
                console.error("Error fetching subjects:", err);
                setError("Failed to fetch subjects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [semester]); // Re-fetch when semester changes

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
