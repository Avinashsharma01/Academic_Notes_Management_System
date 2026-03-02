/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Import smaller components
import BranchesHeader from "./Components/BranchesHeader";
import CourseDetails from "./Components/CourseDetails";
import BranchCard from "./Components/BranchCard";
import EmptyBranchesList from "./Components/EmptyBranchesList";
import { BranchesLoading, BranchesError } from "./Components/BranchesStates";
import API from "../Api/axiosInstance";

const Branches = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [branches, setBranches] = useState([]);

    // Extract course name from query parameters
    const queryParams = new URLSearchParams(location.search);
    const course = queryParams.get("course") || "Course"; // Default value
    const session = queryParams.get("session") || "Session";
    const courseId = queryParams.get("courseId") || "";

    // Fetch branches from API
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                // If we have a courseId, filter branches by course
                let url = "/academic/branches";
                if (courseId) url += `?course=${courseId}`;

                const { data } = await API.get(url);
                const mapped = data.map((b) => ({
                    name: b.name,
                    route: b.code,
                    fullName: b.fullName,
                    _id: b._id,
                    courseId: b.course?._id || b.course || "",
                }));
                setBranches(mapped);
            } catch (err) {
                console.error("Failed to fetch branches:", err);
                setError("Failed to fetch branches. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, [courseId]);

    if (loading) {
        return <BranchesLoading />;
    }

    if (error) {
        return <BranchesError error={error} />;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white pb-16">
            {/* Header section */}
            <BranchesHeader course={course} session={session} />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <CourseDetails course={course} session={session} />

                {/* Branches Grid */}
                {branches.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {branches.map((branch) => (
                            <BranchCard
                                key={branch._id || branch.route}
                                branch={branch}
                                course={course}
                                session={session}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyBranchesList session={session} />
                )}
            </div>
        </div>
    );
};

export default Branches;
