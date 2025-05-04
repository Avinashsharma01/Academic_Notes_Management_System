/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // Import Auth Context

const ProtectedAdminRoute = () => {
    const { admin, loading } = useContext(AuthContext); // Get admin state from context

    // Show loading indicator while checking authentication status
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Check localStorage as fallback
    const Ladmin = localStorage.getItem("admin");

    // Only allow access if admin is authenticated (via context or localStorage)
    return admin || Ladmin ? <Outlet /> : <Navigate to="/adminLogin" replace />;
};

export default ProtectedAdminRoute;
