import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-10 bg-gray-800 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                    className="bg-blue-500 h-28 p-5 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer "
                    onClick={() => navigate("/admin/uploadnotes")}
                >
                    📤 Upload Notes
                </button>

                <button
                    className="bg-green-500 h-28 p-5 rounded-lg shadow-md hover:bg-green-600 cursor-pointer "
                    onClick={() => navigate("/admin/managenotes")}
                >
                    📂 Manage Notes
                </button>

                <button
                    className="bg-yellow-500 h-28 p-5 rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer "
                    onClick={() => navigate("/admin/feedback")}
                >
                    📝 View Feedback
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
