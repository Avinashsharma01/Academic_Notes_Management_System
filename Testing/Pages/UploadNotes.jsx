import { useState } from "react";
import { uploadNote } from "../services/noteService";

const UploadNotes = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadNote({ title, description });
        alert("Note Uploaded Successfully");
        setTitle("");
        setDescription("");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 w-full mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="border p-2 w-full mb-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2"
                >
                    Upload
                </button>
            </form>
        </div>
    );
};

export default UploadNotes;
