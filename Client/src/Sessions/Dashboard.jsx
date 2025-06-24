/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import DashboardHeader from "./Components/DashboardHeader";
import DashboardStats from "./Components/DashboardStats";
import SessionCard from "./Components/SessionCard";
import { DashboardLoading, DashboardError } from "./Components/DashboardStates";

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                // we will fetch the api here for the real data
                // Simulate API call delay
                // await new Promise((resolve) => setTimeout(resolve, 500));
                const data = [
                    {
                        year: 2020,
                        courses: 10,
                        notes: 120,
                        startYear: 2020,
                        endYear: 2024,
                    },
                    {
                        year: 2021,
                        courses: 12,
                        notes: 140,
                        startYear: 2021,
                        endYear: 2025,
                    },
                    {
                        year: 2022,
                        courses: 15,
                        notes: 160,
                        startYear: 2022,
                        endYear: 2026,
                    },
                    {
                        year: 2023,
                        courses: 18,
                        notes: 180,
                        startYear: 2023,
                        endYear: 2027,
                    },
                    {
                        year: 2024,
                        courses: 20,
                        notes: 200,
                        startYear: 2024,
                        endYear: 2028,
                    },
                    {
                        year: 2025,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2029,
                    },
                    {
                        year: 2026,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2030,
                    },
                    {
                        year: 2027,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2031,
                    },
                    {
                        year: 2028,
                        courses: 22,
                        notes: 220,
                        startYear: 2025,
                        endYear: 2032,
                    },
                    {
                        year: 2029,
                        courses: 22,
                        notes: 0,
                        startYear: 2025,
                        endYear: 2032,
                    },
                    {
                        year: 2030,
                        courses: 25,
                        notes: 0,
                        startYear: 2025,
                        endYear: 2032,
                    },
                    {
                        year: 2031,
                        courses: 22,
                        notes: 0,
                        startYear: 2025,
                        endYear: 2032,
                    },
                ];
                setSessions(data);
            } catch (err) {
                setError("Failed to fetch sessions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (loading) {
        return <DashboardLoading />;
    }

    if (error) {
        return <DashboardError error={error} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            <DashboardHeader />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <DashboardStats sessions={sessions} />

                {/* Session Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sessions.map((session) => (
                        <SessionCard key={session.year} session={session} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
