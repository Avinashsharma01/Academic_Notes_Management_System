import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";
import Breadcrumb from "../Components/Breadcrumb";
import {
    FaBook,
    FaDownload,
    FaSearch,
    FaFilter,
    // FaStar,
    FaEye,
    FaUser,
    FaCalendarAlt,
    FaTag,
} from "react-icons/fa";

const NotesList = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { AdminToken, UserToken, admin } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    // Extract parameters from URL
    const session = queryParams.get("session") || "";
    const course = queryParams.get("course") || "";
    const branch = queryParams.get("branch") || "";
    const semester = queryParams.get("semester") || "";
    const subject = queryParams.get("subject") || "";

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try {
                const token = UserToken || AdminToken;
                if (!token) {
                    console.error("No token available");
                    setError("You must be logged in to view notes");
                    setLoading(false);
                    return;
                }

                const { data } = await API.get("/notes", {
                    headers: {
                        Authorization: token,
                    },
                });

                // Filter notes based on the selected hierarchy (case-insensitive)
                const filtered = data.filter(
                    (note) =>
                        (!session ||
                            note.session.toLowerCase() ===
                                session.toLowerCase()) &&
                        (!course ||
                            note.course
                                .toLowerCase()
                                .includes(course.toLowerCase())) &&
                        (!branch ||
                            note.branch.toLowerCase() ===
                                branch.toLowerCase()) &&
                        (!semester ||
                            note.semester
                                .toLowerCase()
                                .includes(semester.toLowerCase())) &&
                        (!subject ||
                            note.subject
                                .toLowerCase()
                                .includes(subject.toLowerCase()))
                );

                setNotes(filtered);
                setFilteredNotes(filtered);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notes:", error);
                setError("Failed to load notes. Please try again later.");
                setLoading(false);
            }
        };

        fetchNotes();
    }, [session, subject, semester, branch, course, UserToken, AdminToken]);

    // Handle search
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredNotes(notes);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = notes.filter(
            (note) =>
                note.title.toLowerCase().includes(query) ||
                note.description.toLowerCase().includes(query) ||
                note.subject.toLowerCase().includes(query)
        );

        setFilteredNotes(results);
    }, [searchQuery, notes]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-blue-600 text-xl font-semibold">
                        Loading notes...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto mb-4">
                        !
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Error
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            {/* Header with background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative">
                {/* Breadcrumb */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 mb-6">
                    <Breadcrumb />
                </div>

                <div className="max-w-7xl mx-auto mt-4 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        {subject ? subject : "All Notes"}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        {branch && course ? (
                            <>
                                Viewing notes for{" "}
                                <span className="font-semibold">{subject}</span>{" "}
                                in{" "}
                                <span className="font-semibold">
                                    {semester}
                                </span>{" "}
                                semester,{" "}
                                <span className="font-semibold">
                                    {branch.toUpperCase()}
                                </span>{" "}
                                branch,{" "}
                                <span className="font-semibold">
                                    {course.toUpperCase()}
                                </span>{" "}
                                course
                            </>
                        ) : (
                            "Browse through available academic notes and resources"
                        )}
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full -mb-36 -mr-36 z-0"></div>
                <div className="absolute top-12 right-32 w-16 h-16 bg-white/5 rounded-full z-0"></div>
                <div className="absolute bottom-12 left-16 w-24 h-24 bg-white/5 rounded-full z-0"></div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                {/* Search and filter */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="w-full md:w-2/3 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search notes by title, description or subject..."
                                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="w-full md:w-auto flex justify-between md:justify-end gap-3 flex-wrap">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/semester?branch=${branch}&course=${course}&session=${session}`
                                    )
                                }
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <FaFilter className="text-gray-600" />
                                Change Filters
                            </button>
                            {admin && (
                                <button
                                    onClick={() => navigate("/notes/upload")}
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center gap-2 transition-colors hover:from-green-600 hover:to-green-700 shadow-md"
                                >
                                    <FaBook />
                                    Upload Notes
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {filteredNotes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300"
                            >
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                        {note.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {note.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-3">
                                            <FaTag className="text-blue-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Subject
                                                </p>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {note.subject}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaCalendarAlt className="text-purple-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Semester
                                                </p>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {note.semester}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                {note.branch}
                                            </span>
                                            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                                {note.course}
                                            </span>
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                {note.session}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <FaUser className="text-gray-400" />
                                            <span>
                                                {note.uploaderName ||
                                                    "Anonymous"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaEye className="text-gray-400" />
                                            <span>{note.views || 0} views</span>
                                        </div>
                                    </div>

                                    <a
                                        href={note.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FaDownload />
                                        Download Note
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                            <FaBook size={32} />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            No Notes Found
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {searchQuery
                                ? "No notes match your search criteria. Try adjusting your search terms."
                                : "There are no notes available for the selected criteria yet."}
                        </p>
                        {searchQuery ? (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    navigate(
                                        `/semester?branch=${branch}&course=${course}&session=${session}`
                                    )
                                }
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Change Selection
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesList;
