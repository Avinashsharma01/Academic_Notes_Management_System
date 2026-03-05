import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

// Submit Feedback
export const submitFeedback = async (feedbackData) => {
    return await axios.post(`${API_URL}`, feedbackData);
};

// Get Feedback
export const getFeedback = async () => {
    return await axios.get(`${API_URL}`);
};
