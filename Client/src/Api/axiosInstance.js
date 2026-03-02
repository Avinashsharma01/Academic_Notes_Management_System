import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    // baseURL: "https://fz5nw02t-5000.inc1.devtunnels.ms/api",
    withCredentials: true, // ✅ Cookies are sent automatically with every request
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
// Since the backend uses httpOnly cookies for authentication,
// we do NOT need to manually attach Authorization headers.
// The `withCredentials: true` setting above ensures cookies are sent automatically.
API.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle authentication errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("Authentication expired. Please log in again.");
        }
        return Promise.reject(error);
    }
);

export default API;
