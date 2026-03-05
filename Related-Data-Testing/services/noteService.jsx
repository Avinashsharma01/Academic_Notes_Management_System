import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

// Fetch All Notes
export const fetchNotes = async () => {
    return await axios.get(`${API_URL}`);
};

// Fetch Note by ID
export const fetchNoteById = async (noteId) => {
    return await axios.get(`${API_URL}/${noteId}`);
};

// Upload a New Note
export const uploadNote = async (noteData) => {
    return await axios.post(`${API_URL}/upload`, noteData);
};

// Delete a Note (Admin Only)
export const deleteNote = async (noteId) => {
    return await axios.delete(`${API_URL}/${noteId}`);
};

// Search Notes
export const searchNotes = async (query, subject) => {
    let url = `${API_URL}/search?`;
    if (query) url += `query=${query}&`;
    if (subject) url += `subject=${subject}`;
    return await axios.get(url);
};
