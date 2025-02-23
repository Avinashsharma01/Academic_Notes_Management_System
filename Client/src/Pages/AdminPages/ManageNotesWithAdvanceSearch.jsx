import { useEffect, useState, useContext } from "react";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";

const ManageNotesWithAdvanceSearch = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        subject: "",
        course: "",
        semester: "",
        branch: "",
        session: "",
    });
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Default limit per page
    const { AdminToken } = useContext(AuthContext);

    useEffect(() => {
        fetchNotes();
    }, [AdminToken, page, filters]); // Refetch when filters or page changes

    const fetchNotes = async () => {
        try {
            const token = AdminToken;
            if (!token) {
                console.error("No token available");
                return;
            }

            const { data } = await API.get("/notes/search", {
                headers: { Authorization: token },
                params: {
                    query: searchQuery,
                    ...filters,
                    page,
                    limit,
                },
            });
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const token = AdminToken;
            await API.delete(`/notes/${id}`, {
                headers: { Authorization: token },
            });
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
        }
    };

    const updateNote = (id) => {
        console.log(id);
        alert("This functionality is coming soon...");
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0) setPage(newPage);
    };

    return (
        <div className="p-10 bg-gray-800 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-5">Manage Notes</h1>

            {/* Search & Filter Section */}
            <div className="flex flex-wrap gap-4 mb-5 justify-center">
                <input
                    type="text"
                    placeholder="Search Title/Description"
                    className="border px-4 py-2 rounded-lg text-black"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Filter by Subject"
                    className="border px-4 py-2 rounded-lg text-black"
                    value={filters.subject}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="course"
                    placeholder="Filter by Course"
                    className="border px-4 py-2 rounded-lg text-black"
                    value={filters.course}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="branch"
                    placeholder="Filter by Branch"
                    className="border px-4 py-2 rounded-lg text-black"
                    value={filters.branch}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="semester"
                    placeholder="Filter by Semester"
                    className="border px-4 py-2 rounded-lg text-black"
                    value={filters.semester}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="session"
                    placeholder="Filter by Session"
                    className="border px-4 py-2 rounded-lg text-black"
                    value={filters.session}
                    onChange={handleFilterChange}
                />
                <button
                    onClick={fetchNotes}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    🔍 Search
                </button>
            </div>

            {/* Notes List */}
            {notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-gray-700 p-4 rounded-lg shadow-lg"
                        >
                            <h2 className="font-bold text-lg text-blue-400">
                                {note.title}
                            </h2>
                            <p className="text-sm text-gray-300">
                                Description: {note.description}
                            </p>
                            <p className="text-sm text-gray-300">
                                Session: {note.session}
                            </p>
                            <p className="text-sm text-gray-300">
                                Course: {note.course}
                            </p>
                            <p className="text-sm text-gray-300">
                                Branch: {note.branch}
                            </p>
                            <p className="text-sm text-gray-300">
                                Semester: {note.semester}
                            </p>
                            <p className="text-sm text-gray-300">
                                Subject: {note.subject}
                            </p>
                            <div className="btn w-full flex justify-around items-center">
                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="mt-3 bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
                                >
                                    🗑 Delete
                                </button>
                                <button
                                    onClick={() => updateNote(note._id)}
                                    className="mt-3 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 cursor-pointer"
                                >
                                    📝 Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">No notes available.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-5">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    disabled={page === 1}
                >
                    ⬅ Previous
                </button>
                <span className="text-white">Page {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
};

export default ManageNotesWithAdvanceSearch;
