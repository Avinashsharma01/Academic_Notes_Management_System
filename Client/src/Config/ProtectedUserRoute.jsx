/* eslint-disable react-hooks/rules-of-hooks */

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // Import Auth Context

const ProtectedUserRoute = () => {
    try {
        const { user, admin, superAdmin, loading } = useContext(AuthContext); // Get authenticated state from context

        // Show loading indicator while checking authentication status
        if (loading) {
            return (
                <div className="min-h-screen flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }

        // Allow access only when auth context has a verified active session
        return user || admin || superAdmin ? (
            <Outlet />
        ) : (
            <Navigate to="/login" replace />
        );
    } catch (error) {
        console.error("Error in ProtectedUserRoute:", error);
        // If there's an error in the auth context, redirect to login
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedUserRoute;
