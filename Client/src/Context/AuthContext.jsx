/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import API from "../Api/axiosInstance";
import { auth, googleProvider } from "../Config/firebase";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [superAdmin, setSuperAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authVerified, setAuthVerified] = useState(false);

    const clearAuthState = () => {
        setUser(null);
        setAdmin(null);
        setSuperAdmin(null);
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        localStorage.removeItem("superAdmin");
    };

    // Check authentication status on mount via cookie
    useEffect(() => {
        const checkAuthStatus = async () => {
            const authProbeConfig = { skipAuthHandler: true };

            try {
                // Try superadmin auth first
                try {
                    const saResponse = await API.get(
                        "/superadmin/profile",
                        authProbeConfig
                    );
                    if (saResponse.data && saResponse.data.superAdmin) {
                        const saData = saResponse.data.superAdmin;
                        setSuperAdmin(saData);
                        setAdmin(null);
                        setUser(null);
                        localStorage.setItem("superAdmin", JSON.stringify(saData));
                        localStorage.removeItem("admin");
                        localStorage.removeItem("user");
                        setAuthVerified(true);
                        setLoading(false);
                        return;
                    }
                } catch (saError) {
                    // SuperAdmin auth failed — try admin next
                }

                // Try admin auth
                try {
                    const adminResponse = await API.get(
                        "/auth/admin/me",
                        authProbeConfig
                    );
                    if (adminResponse.data && adminResponse.data.admin) {
                        const adminData = adminResponse.data.admin;
                        setAdmin(adminData);
                        setUser(null);
                        setSuperAdmin(null);
                        localStorage.setItem("admin", JSON.stringify(adminData));
                        localStorage.removeItem("user");
                        localStorage.removeItem("superAdmin");
                        setAuthVerified(true);
                        setLoading(false);
                        return;
                    }
                } catch (adminError) {
                    // Admin auth failed — try user
                }

                // Try user auth
                try {
                    const userResponse = await API.get(
                        "/auth/me",
                        authProbeConfig
                    );
                    if (userResponse.data && userResponse.data.user) {
                        const userData = userResponse.data.user;
                        setUser(userData);
                        setAdmin(null);
                        setSuperAdmin(null);
                        localStorage.setItem("user", JSON.stringify(userData));
                        localStorage.removeItem("admin");
                        localStorage.removeItem("superAdmin");
                        setAuthVerified(true);
                        setLoading(false);
                        return;
                    }
                } catch (userError) {
                    // User auth also failed
                }

                // No valid session
                clearAuthState();
                setAuthVerified(true);
            } catch (error) {
                console.error("Auth check error:", error);
                clearAuthState();
                setAuthVerified(true);
            } finally {
                setLoading(false);
            }
        };

        const handleUnauthorized = () => {
            clearAuthState();
            setAuthVerified(true);
            setLoading(false);
        };

        window.addEventListener("auth:unauthorized", handleUnauthorized);

        checkAuthStatus();

        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized);
        };
    }, []);

    // Periodically validate active session so expired tokens log out idle users too.
    useEffect(() => {
        const hasActiveAuth = user || admin || superAdmin;
        if (!hasActiveAuth) return;

        const authProbeConfig = { skipAuthHandler: true };

        const validateCurrentSession = async () => {
            try {
                if (superAdmin) {
                    await API.get("/superadmin/profile", authProbeConfig);
                    return;
                }

                if (admin) {
                    await API.get("/auth/admin/me", authProbeConfig);
                    return;
                }

                if (user) {
                    await API.get("/auth/me", authProbeConfig);
                }
            } catch (error) {
                clearAuthState();
                setAuthVerified(true);
            }
        };

        const intervalId = window.setInterval(validateCurrentSession, 15000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [user, admin, superAdmin]);

    // Login for regular users
    const login = async (credentials) => {
        const { data } = await API.post("/auth/login", credentials);
        setUser(data.user);
        setAdmin(null);
        setSuperAdmin(null);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("admin");
        localStorage.removeItem("superAdmin");
        setAuthVerified(true);
        return { success: true };
    };

    // Google Login
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;
            const idToken = await firebaseUser.getIdToken();

            const { data } = await API.post("/auth/google", {
                idToken,
                provider: "google",
            });

            setUser(data.user);
            setAdmin(null);
            setSuperAdmin(null);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.removeItem("admin");
            localStorage.removeItem("superAdmin");
            setAuthVerified(true);

            return { success: true, user: data.user };
        } catch (error) {
            console.error("Google login error:", error);
            if (error.code === "auth/popup-closed-by-user") {
                throw new Error("Sign-in popup was closed. Please try again.");
            }
            if (error.code === "auth/network-request-failed") {
                throw new Error("Network error. Please check your internet connection.");
            }
            throw error;
        }
    };

    // Login for admin users
    const Adminlogin = async (credentials) => {
        const { data } = await API.post("/auth/loginAdmin", credentials);
        setAdmin(data.admin);
        setUser(null);
        setSuperAdmin(null);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        localStorage.removeItem("user");
        localStorage.removeItem("superAdmin");
        setAuthVerified(true);
        return { success: true };
    };

    // Login for SuperAdmin
    const superAdminLogin = async (credentials) => {
        const { data } = await API.post("/superadmin/login", credentials);
        setSuperAdmin(data.superAdmin);
        setAdmin(null);
        setUser(null);
        localStorage.setItem("superAdmin", JSON.stringify(data.superAdmin));
        localStorage.removeItem("admin");
        localStorage.removeItem("user");
        setAuthVerified(true);
        return { success: true };
    };

    // Logout for regular users
    const logout = async () => {
        try {
            await API.post("/auth/logout");
            await auth.signOut();
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            clearAuthState();
        }
    };

    // Logout for admin users
    const Adminlogout = async () => {
        try {
            await API.post("/auth/logout");
        } catch (error) {
            console.error("Admin logout API call failed:", error);
        } finally {
            clearAuthState();
        }
    };

    // Logout for SuperAdmin
    const superAdminLogout = async () => {
        try {
            await API.get("/superadmin/logout");
        } catch (error) {
            console.error("SuperAdmin logout API call failed:", error);
        } finally {
            clearAuthState();
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
                superAdmin,
                superAdminLogin,
                superAdminLogout,
                googleLogin,
                loading,
                authVerified,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
