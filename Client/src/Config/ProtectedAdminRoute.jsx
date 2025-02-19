import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // Import Auth Context

const ProtectedAdminRoute = () => {
    const { admin } = useContext(AuthContext); // Get user from context

    return admin ? <Outlet /> : <Navigate to="/adminLogin" replace />;
};

export default ProtectedAdminRoute;
