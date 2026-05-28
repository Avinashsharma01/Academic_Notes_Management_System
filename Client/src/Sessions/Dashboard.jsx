import { useState, useEffect } from "react";
import DashboardHeader from "./Components/DashboardHeader";
import DashboardStats from "./Components/DashboardStats";
import SessionCard from "./Components/SessionCard";
import { DashboardLoading, DashboardError } from "./Components/DashboardStates";
import API from "../Api/axiosInstance";

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [totals, setTotals] = useState({
        courses: 0,
        notes: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [sessionsRes, coursesRes, notesRes] = await Promise.all([
                    API.get("/academic/sessions"),
                    API.get("/academic/courses"),
                    API.get("/notes"),
                ]);

                const sessionData = Array.isArray(sessionsRes.data)
                    ? sessionsRes.data
                    : [];
                const courseData = Array.isArray(coursesRes.data)
                    ? coursesRes.data
                    : [];
                const noteData = Array.isArray(notesRes.data)
                    ? notesRes.data
                    : [];

                // Map API data to match the expected format for SessionCard
                const mapped = sessionData.map((s) => ({
                    year: s.year,
                    courses: 0,
                    notes: 0,
                    startYear: s.startYear,
                    endYear: s.endYear,
                    _id: s._id,
                }));
                setSessions(mapped);
                setTotals({
                    courses: courseData.length,
                    notes: noteData.length,
                });
            } catch (err) {
                console.error("Failed to fetch sessions:", err);
                setError("Failed to fetch sessions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <DashboardLoading />;
    }

    if (error) {
        return <DashboardError error={error} />;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white pb-16">
            <DashboardHeader />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <DashboardStats
                    sessions={sessions}
                    totalCourses={totals.courses}
                    totalNotes={totals.notes}
                />

                {/* Session Cards */}
                {sessions.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {sessions.map((session) => (
                            <SessionCard key={session._id || session.year} session={session} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No sessions available yet. Please check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
