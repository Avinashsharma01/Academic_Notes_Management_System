/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import API from "../Api/axiosInstance"; // API base

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const adminToken = localStorage.getItem("authTokenAdmin");
        const storedUser = localStorage.getItem("user");
        const storedAdmin = localStorage.getItem("admin");

        if ((token && storedUser) || (adminToken && storedAdmin)) {
            setUser(JSON.parse(storedUser)); // Restore user from storage
            setAdmin(JSON.parse(storedAdmin)); // Restore admin from storage
        } else {
            setUser(null);
            setAdmin(null);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await API.post("/auth/login", credentials);

            setUser(data.user);

            // Store both the user info and token in localStorage
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
        } catch (error) {
            console.error("Login failed:", error);
            // Add user feedback here if needed
        }
    };

    const Adminlogin = async (credentials) => {
        try {
            const { data } = await API.post("/auth/loginAdmin", credentials);
            console.log(data);

            setAdmin(data.admin);

            // Store both the admin info and token in localStorage
            localStorage.setItem("authTokenAdmin", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin)); // Save admin data
        } catch (error) {
            console.error("Admin login failed:", error);
            // Add user feedback here if needed
        }
    };

    const logout = () => {
        try {
            // Perform local cleanup
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            // Redirect to login using window.location if useNavigate is problematic
            // window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
            // Add user feedback here if needed
        }
    };

    const Adminlogout = () => {
        try {
            // Perform local cleanup
            setAdmin(null);
            localStorage.removeItem("authTokenAdmin");
            localStorage.removeItem("admin");
            // Redirect to login using window.location if useNavigate is problematic
            // window.location.href = "/";
        } catch (error) {
            console.error("Admin logout failed:", error);
            // Add user feedback here if needed
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, admin, Adminlogin, Adminlogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
