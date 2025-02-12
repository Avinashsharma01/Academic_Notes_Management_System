import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // Import Auth Context

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext); // Get user from context

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
