/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import API from "../Api/axiosInstance"; // api base

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await API.get("/auth/me");
                setUser(data.user);
            } catch {
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const { data } = await API.post("/auth/login", credentials);
        setUser(data.user);
    };

    const logout = async () => {
        await API.post("/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
