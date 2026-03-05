import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Signup Function
export const signup = async (userData) => {
    return await axios.post(`${API_URL}/signup`, userData);
};

// Login Function
export const login = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};
