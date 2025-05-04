import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Required for JWT authentication
});

// Request interceptor to add token from localStorage if it exists
API.interceptors.request.use(
    (config) => {
        // Try to get token from localStorage for backward compatibility
        const userToken = localStorage.getItem("authToken");
        const adminToken = localStorage.getItem("authTokenAdmin");
        const token = userToken || adminToken;

        // Add token to headers if it exists
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle authentication errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log detailed error information for debugging
        console.log('API Error:', error.response?.status, error.response?.data);

        // Handle specific authentication errors
        if (error.response) {
            const status = error.response.status;

            // Handle unauthorized or forbidden errors
            if (status === 401 || status === 403) {
                console.log("Authentication error - you may need to log in again");
                // You could redirect to login page or trigger a token refresh here
            }

            // Handle 404 errors related to authentication
            if (status === 404 && error.response.data?.message?.includes("not found")) {
                console.log("User not found or session expired");
                // Handle gracefully and continue using localStorage data if available
            }
        }

        return Promise.reject(error);
    }
);

export default API;
