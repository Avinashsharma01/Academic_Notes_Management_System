/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // Import Auth Context

const ProtectedUserRoute = () => {
    const { user, admin, loading } = useContext(AuthContext); // Get authenticated state from context

    // Show loading indicator while checking authentication status
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Check localStorage as fallback
    const Luser = localStorage.getItem("user");
    const Ladmin = localStorage.getItem("admin");

    // Allow access if user or admin is authenticated (via context or localStorage)
    return user || admin || Luser || Ladmin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedUserRoute;
