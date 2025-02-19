import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // Import Auth Context

const ProtectedUserRoute = () => {
    const { user, admin } = useContext(AuthContext); // Get user from context

    return user || admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedUserRoute;
