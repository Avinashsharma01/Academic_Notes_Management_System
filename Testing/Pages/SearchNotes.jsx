import { useState } from "react";
import { searchNotes } from "../services/noteService";

const SearchNotes = () => {
    const [query, setQuery] = useState("");
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState([]);

    const handleSearch = async () => {
        const response = await searchNotes(query, subject);
        setNotes(response.data);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Search Notes</h2>
            <input
                type="text"
                placeholder="Search Query"
                className="border p-2 w-full mb-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <input
                type="text"
                placeholder="Subject"
                className="border p-2 w-full mb-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Search
            </button>

            <div className="mt-4">
                {notes.map((note) => (
                    <div key={note._id} className="border p-4 mb-3">
                        <h3 className="font-bold">{note.title}</h3>
                        <p>{note.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchNotes;
