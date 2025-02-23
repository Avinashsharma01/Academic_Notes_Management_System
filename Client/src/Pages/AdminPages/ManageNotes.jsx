import { useEffect, useState, useContext } from "react";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";

const ManageNotes = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { AdminToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllnotes = async () => {
            try {
                const token = AdminToken;

                if (!token) {
                    console.error("No token available");
                    return;
                }

                const { data } = await API.get("/notes", {
                    headers: {
                        Authorization: token, // Include the token in the headers
                    },
                });
                setNotes(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };
        fetchAllnotes();
    }, [AdminToken]);

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const token = AdminToken;
            await API.delete(`/notes/${id}`, {
                headers: {
                    Authorization: token, // Include the token in the headers
                },
            });
            setNotes(notes.filter((note) => note._id !== id));
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
            const { data } = await API.get(`/notes/search`, {
                headers: {
                    Authorization: token,
                },
                params: {
                    query,
                },
            });
            setNotes(data);
        } catch (err) {
            console.error("Error searching notes:", err);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        searchNotes(query);
    };

    return (
        <div className="p-10 bg-gray-800 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-5">Manage Notes</h1>

            <div className="searchBar w-full p-2 flex justify-center items-center mb-5">
                <input
                    type="text"
                    placeholder="Search notes (e.g., Title, Description, Session, Course, Branch, Semester, etc)"
                    className="border w-[50%] h-12 px-4 rounded-2xl"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            {notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-gray-700 p-4 rounded-lg shadow-lg hover:scale-105 transform ease-in-out duration-300"
                        >
                            <h2 className="font-bold text-lg text-blue-400 ">
                                {note.title}
                            </h2>
                            <p className="text-sm text-gray-300">
                                description:- {note.description}
                            </p>
                            <p className="text-sm text-gray-300">
                                Session:- {note.session}
                            </p>
                            <p className="text-sm text-gray-300">
                                Course:- {note.course}
                            </p>
                            <p className="text-sm text-gray-300">
                                Branch:- {note.branch}
                            </p>
                            <p className="text-sm text-gray-300">
                                Semester:- {note.semester}
                            </p>
                            <p className="text-sm text-gray-300">
                                Subject:- {note.subject}
                            </p>
                            <div className="btn w-full flex justify-around items-center ">
                                <button
                                    onClick={() => deleteNote(note._id)}
                                    className="mt-3 bg-red-500 text-white p-2  rounded hover:bg-red-600 cursor-pointer"
                                >
                                    🗑 Delete
                                </button>
                                <button
                                    onClick={() => updateNote(note._id)}
                                    className="mt-3 bg-yellow-500 text-white p-2  rounded hover:bg-blue-600 cursor-pointer"
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
        </div>
    );
};

export default ManageNotes;
