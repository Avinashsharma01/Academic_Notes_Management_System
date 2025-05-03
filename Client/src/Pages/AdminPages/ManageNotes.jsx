import { useEffect, useState, useContext } from "react";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";
import {
    FaSearch,
    FaTrashAlt,
    FaEdit,
    FaFileAlt,
    FaInfoCircle,
} from "react-icons/fa";

const ManageNotes = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { AdminToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllnotes = async () => {
            try {
                const token = AdminToken;

                if (!token) {
                    console.error("No token available");
                    return;
                }

                setLoading(true);
                const { data } = await API.get("/notes", {
                    headers: {
                        Authorization: token,
                    },
                });
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                setLoading(false);
            }
        };
        fetchAllnotes();
    }, [AdminToken]);

    // Delete a note
    const deleteNote = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this note?")) {
                const token = AdminToken;
                await API.delete(`/notes/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setNotes(notes.filter((note) => note._id !== id));
            }
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    // Update notes
    const updateNote = async (id) => {
        console.log(id);
        alert("This functionality will come very soon.....");
    };

    // Search Notes
    const searchNotes = async (query) => {
        try {
            const token = AdminToken;
            setLoading(true);
            const { data } = await API.get(`/notes/search`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    query,
                },
            });
            setNotes(data);
            setLoading(false);
        } catch (err) {
            console.error("Error searching notes:", err);
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        searchNotes(query);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Header */}
            <div className="bg-gray-800 p-6 border-b border-gray-700">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white text-center md:text-left">
                        Notes Management
                    </h1>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Search bar */}
                <div className="mb-8">
                    <div className="relative max-w-3xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search notes by title, description, course, branch, semester..."
                            className="w-full bg-gray-700 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Stats summary */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center p-4 bg-blue-900/30 rounded-lg">
                            <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                                <FaFileAlt className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    Total Notes
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {notes.length}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-green-900/30 rounded-lg">
                            <div className="p-3 bg-green-500/20 rounded-full mr-4">
                                <FaInfoCircle className="text-green-400 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    Most Popular Subject
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    Computer Science
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-purple-900/30 rounded-lg">
                            <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                                <FaFileAlt className="text-purple-400 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    Recently Added
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {notes.length > 0
                                        ? notes[0].title.substring(0, 12) +
                                          "..."
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : notes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                            >
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                                <div className="p-6">
                                    <h2 className="font-bold text-xl text-white mb-2 truncate">
                                        {note.title}
                                    </h2>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-400 mb-1 truncate">
                                            {note.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
                                                {note.session}
                                            </span>
                                            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                                                {note.course}
                                            </span>
                                            <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs">
                                                {note.branch}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-gray-700/50 rounded p-2">
                                                <p className="text-xs text-gray-400">
                                                    Semester
                                                </p>
                                                <p className="text-sm text-white font-medium">
                                                    {note.semester}
                                                </p>
                                            </div>
                                            <div className="bg-gray-700/50 rounded p-2">
                                                <p className="text-xs text-gray-400">
                                                    Subject
                                                </p>
                                                <p className="text-sm text-white font-medium truncate">
                                                    {note.subject}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-2 mt-4">
                                            <button
                                                onClick={() =>
                                                    deleteNote(note._id)
                                                }
                                                className="flex items-center justify-center flex-1 bg-red-600/80 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
                                            >
                                                <FaTrashAlt className="mr-2" />{" "}
                                                Delete
                                            </button>
                                            <a
                                                href={note.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center flex-1 bg-blue-600/80 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                                            >
                                                <FaFileAlt className="mr-2" />{" "}
                                                Preview
                                            </a>
                                            <button
                                                onClick={() =>
                                                    updateNote(note._id)
                                                }
                                                className="flex items-center justify-center flex-1 bg-yellow-600/80 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
                                            >
                                                <FaEdit className="mr-2" /> Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-xl p-12 shadow-lg text-center">
                        <FaFileAlt className="text-gray-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">
                            No Notes Found
                        </h3>
                        <p className="text-gray-400">
                            There are no notes matching your search criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageNotes;
