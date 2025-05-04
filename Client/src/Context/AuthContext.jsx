/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import API from "../Api/axiosInstance"; // API base

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState(
        localStorage.getItem("authToken")
    );
    const [adminToken, setAdminToken] = useState(
        localStorage.getItem("authTokenAdmin")
    );
    const [authVerified, setAuthVerified] = useState(false);

    // Check authentication status on mount
    useEffect(() => {
        // First check for legacy localStorage authentication
        const storedUser = localStorage.getItem("user");
        const storedAdmin = localStorage.getItem("admin");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }

        // Then check for cookie-based authentication
        const checkAuthStatus = async () => {
            try {
                // Only attempt to verify with the server if we have some form of authentication
                // (either a token or localStorage user data)
                if (userToken || adminToken || storedUser || storedAdmin) {
                    let userData = null;
                    let isAdmin = false;

                    // Try admin authentication first if there's an admin token or admin data in localStorage
                    if (adminToken || storedAdmin) {
                        try {
                            const adminResponse = await API.get(
                                "/auth/admin/me"
                            );
                            if (
                                adminResponse.data &&
                                adminResponse.data.admin
                            ) {
                                userData = adminResponse.data.admin;
                                isAdmin = true;
                            }
                        } catch (adminError) {
                            console.log(
                                "Admin auth check failed, trying user auth..."
                            );
                        }
                    }

                    // If admin auth failed or wasn't attempted, try user auth
                    if (!userData && (userToken || storedUser)) {
                        try {
                            const userResponse = await API.get("/auth/me");
                            if (userResponse.data && userResponse.data.user) {
                                userData = userResponse.data.user;
                                isAdmin = userData.role === "admin";
                            }
                        } catch (userError) {
                            console.log("User auth check failed");
                        }
                    }

                    // Authentication verified successfully
                    setAuthVerified(true);

                    // Update state based on the data we got
                    if (userData) {
                        if (isAdmin) {
                            setAdmin(userData);
                            localStorage.setItem(
                                "admin",
                                JSON.stringify(userData)
                            );

                            // Ensure admin token exists for backward compatibility
                            if (!adminToken) {
                                const dummyToken = `cookie_auth_${Date.now()}`;
                                localStorage.setItem(
                                    "authTokenAdmin",
                                    dummyToken
                                );
                                setAdminToken(dummyToken);
                            }

                            setUser(null);
                            localStorage.removeItem("user");
                            localStorage.removeItem("authToken");
                            setUserToken(null);
                        } else {
                            setUser(userData);
                            localStorage.setItem(
                                "user",
                                JSON.stringify(userData)
                            );

                            // Ensure user token exists for backward compatibility
                            if (!userToken) {
                                const dummyToken = `cookie_auth_${Date.now()}`;
                                localStorage.setItem("authToken", dummyToken);
                                setUserToken(dummyToken);
                            }

                            setAdmin(null);
                            localStorage.removeItem("admin");
                            localStorage.removeItem("authTokenAdmin");
                            setAdminToken(null);
                        }
                    } else {
                        // If no authentication data from server but we have localStorage data, keep using that
                        console.log(
                            "No auth data from server, continuing with localStorage data"
                        );
                    }
                } else {
                    // If we don't have any authentication data, mark as verified but not authenticated
                    setAuthVerified(true);
                    setUser(null);
                    setAdmin(null);
                }
            } catch (error) {
                // If the request fails but we have localStorage data, keep using that
                console.log(
                    "Auth check failed, using localStorage if available:",
                    error.response?.status || error.message
                );

                // Mark authentication as verified (even though it failed)
                // This allows us to continue with localStorage data
                setAuthVerified(true);

                // Handle specific error cases
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 404
                ) {
                    // If server says user is not authenticated or not found, clear server-side auth
                    // but keep localStorage auth for backward compatibility
                    console.log(
                        "Authentication expired or invalid on server, using local data only"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, [userToken, adminToken]);

    // Login for regular users
    const login = async (credentials) => {
        try {
            const { data } = await API.post("/auth/login", credentials);

            // Set user data in state and localStorage for backward compatibility
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Authentication is now verified
            setAuthVerified(true);

            // If we have a token in the response, also store it (for backward compatibility)
            if (data.token) {
                localStorage.setItem("authToken", data.token);
                setUserToken(data.token);
            } else {
                // If no token but successful login, create dummy token for backwards compatibility
                const dummyToken = `cookie_auth_${Date.now()}`;
                localStorage.setItem("authToken", dummyToken);
                setUserToken(dummyToken);
            }

            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    // Login for admin users
    const Adminlogin = async (credentials) => {
        try {
            const { data } = await API.post("/auth/loginAdmin", credentials);

            // Set admin data in state and localStorage for backward compatibility
            setAdmin(data.admin);
            localStorage.setItem("admin", JSON.stringify(data.admin));

            // Authentication is now verified
            setAuthVerified(true);

            // If we have a token in the response, also store it (for backward compatibility)
            if (data.token) {
                localStorage.setItem("authTokenAdmin", data.token);
                setAdminToken(data.token);
            } else {
                // If no token but successful login, create dummy token for backwards compatibility
                const dummyToken = `cookie_auth_${Date.now()}`;
                localStorage.setItem("authTokenAdmin", dummyToken);
                setAdminToken(dummyToken);
            }

            return { success: true };
        } catch (error) {
            console.error("Admin login failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Admin login failed",
            };
        }
    };

    // Logout for regular users
    const logout = async () => {
        try {
            // Call the backend logout endpoint to clear the cookie
            await API.post("/auth/logout");

            // Clear local state and storage
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            setUserToken(null);
        } catch (error) {
            console.error("Logout failed:", error);

            // Even if the server request fails, clear the local state
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            setUserToken(null);
        }
    };

    // Logout for admin users
    const Adminlogout = async () => {
        try {
            // Call the backend logout endpoint to clear the cookie
            await API.post("/auth/logout");

            // Clear local state and storage
            setAdmin(null);
            localStorage.removeItem("admin");
            localStorage.removeItem("authTokenAdmin");
            setAdminToken(null);
        } catch (error) {
            console.error("Admin logout failed:", error);

            // Even if the server request fails, clear the local state
            setAdmin(null);
            localStorage.removeItem("admin");
            localStorage.removeItem("authTokenAdmin");
            setAdminToken(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                admin,
                Adminlogin,
                Adminlogout,
                loading,
                authVerified,
                // Use state variables instead of directly accessing localStorage
                UserToken: userToken,
                AdminToken: adminToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
