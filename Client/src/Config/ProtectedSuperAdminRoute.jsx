import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProtectedSuperAdminRoute = () => {
    const { superAdmin, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    if (!superAdmin) {
        return <Navigate to="/superadmin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedSuperAdminRoute;
