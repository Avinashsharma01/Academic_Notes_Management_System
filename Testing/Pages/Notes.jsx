import { useEffect, useState } from "react";
import { fetchNotes, deleteNote } from "../services/noteService";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const loadNotes = async () => {
            const response = await fetchNotes();
            setNotes(response.data);
        };
        loadNotes();
    }, []);

    const handleDelete = async (id) => {
        await deleteNote(id);
        setNotes(notes.filter((note) => note._id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notes</h2>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div key={note._id} className="border p-4 mb-3">
                        <h3 className="font-bold">{note.title}</h3>
                        <p>{note.description}</p>
                        <button
                            onClick={() => handleDelete(note._id)}
                            className="bg-red-500 text-white px-3 py-1 mt-2"
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    );
};

export default Notes;
