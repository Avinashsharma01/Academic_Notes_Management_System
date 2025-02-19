/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import StaticBreadCrum from "../Components/StaticBreadCrum";
const Dashboard = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate fetching session data from an API
    useEffect(() => {
        const fetchSessions = async () => {
            try {
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
                    Dashboard
                </h1>
                <p className="text-center text-gray-300 mb-8">
                    Select a session to explore courses and notes
                </p>
                {/* Session Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sessions.map((session) => (
                        <div
                            key={session.year}
                            onClick={() =>
                                navigate(`/courses?year=${session.year}`)
                            }
                            className="bg-gray-700 p-6 rounded-lg cursor-pointer transition-all hover:bg-gray-600 hover:scale-105 transform ease-in-out duration-300"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                Session: {session.year}
                            </h2>
                            <p className="text-gray-300 mb-1">
                                Courses Available: {session.courses}
                            </p>
                            <p className="text-gray-300 mb-1">
                                Notes Uploaded: {session.notes}
                            </p>
                            <p className="text-gray-400">
                                Duration: {session.startYear} -{" "}
                                {session.endYear}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
