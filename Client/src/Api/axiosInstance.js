import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // ✅ Cookies are sent automatically with every request
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
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
        if (error.response?.status === 401 && !error.config?.skipAuthHandler) {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("auth:unauthorized"));
            }
            console.log("Authentication expired. You have been logged out.");
        }
        return Promise.reject(error);
    }
);

export default API;
