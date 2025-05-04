/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import {
    FaFileUpload,
    FaFolderOpen,
    FaComments,
    FaUsers,
    FaChartBar,
    FaCog,
    FaBell,
    FaSearch,
    FaFileAlt,
    FaUserShield,
    FaClipboardList,
} from "react-icons/fa";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);

    // Mock data for statistics
    const stats = [
        {
            title: "Total Users",
            value: "1,234",
            icon: <FaUsers className="text-blue-400" />,
            change: "+5.3%",
            bgColor: "from-blue-500 to-blue-600",
        },
        {
            title: "Notes Uploaded",
            value: "5,678",
            icon: <FaFileUpload className="text-green-400" />,
            change: "+12.8%",
            bgColor: "from-green-500 to-green-600",
        },
        {
            title: "Feedback Count",
            value: "432",
            icon: <FaComments className="text-yellow-400" />,
            change: "+2.4%",
            bgColor: "from-yellow-500 to-yellow-600",
        },
        {
            title: "System Uptime",
            value: "99.9%",
            icon: <FaChartBar className="text-purple-400" />,
            change: "+0.1%",
            bgColor: "from-purple-500 to-purple-600",
        },
    ];

    // Recent activities
    const recentActivities = [
        { action: "New user registered", time: "10 minutes ago", type: "user" },
        {
            action: "Notes uploaded for Computer Science",
            time: "1 hour ago",
            type: "note",
        },
        {
            action: "Feedback received from student",
            time: "2 hours ago",
            type: "feedback",
        },
        {
            action: "System maintenance completed",
            time: "Yesterday",
            type: "system",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Header with search and quick actions */}
            <div className="bg-gray-800 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                            Admin Dashboard
                        </h1>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>

                            <button className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 relative">
                                <FaBell className="text-lg" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
                                    3
                                </span>
                            </button>

                            <button className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                                <FaCog className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Stats section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                        >
                            <div
                                className={`h-1 bg-gradient-to-r ${stat.bgColor}`}
                            ></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold text-white mt-1">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-gray-700/50 rounded-lg">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-green-400 text-sm font-medium">
                                        {stat.change}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {" "}
                                        since last month
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick actions and recent activities */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick actions cards */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-white mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div
                                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate("/admin/uploadnotes")}
                            >
                                <div className="bg-blue-500/30 rounded-lg p-3 inline-block mb-4">
                                    <FaFileUpload className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    Upload Notes
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">
                                    Add new study materials
                                </p>
                            </div>

                            <div
                                className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate("/admin/managenotes")}
                            >
                                <div className="bg-green-500/30 rounded-lg p-3 inline-block mb-4">
                                    <FaFolderOpen className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    Manage Notes
                                </h3>
                                <p className="text-green-100 text-sm mt-1">
                                    Edit or delete materials
                                </p>
                            </div>

                            <div
                                className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-6 shadow-lg hover:from-yellow-700 hover:to-yellow-800 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate("/admin/feedback")}
                            >
                                <div className="bg-yellow-500/30 rounded-lg p-3 inline-block mb-4">
                                    <FaComments className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    View Feedback
                                </h3>
                                <p className="text-yellow-100 text-sm mt-1">
                                    Check user comments
                                </p>
                            </div>

                            <div
                                className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate("/admin/reports")}
                            >
                                <div className="bg-amber-400/30 rounded-lg p-3 inline-block mb-4">
                                    <FaFileAlt className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    View Contact
                                </h3>
                                <p className="text-amber-100 text-sm mt-1">
                                    Analyze submitted issues
                                </p>
                            </div>

                            <div
                                className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate("/admin/roles")}
                            >
                                <div className="bg-purple-500/30 rounded-lg p-3 inline-block mb-4">
                                    <FaUserShield className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    Post Event
                                </h3>
                                <p className="text-purple-100 text-sm mt-1">
                                    Manage user permissions
                                </p>
                            </div>

                            <div
                                className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-300 cursor-pointer"
                                onClick={() => navigate("/admin/logs")}
                            >
                                <div className="bg-orange-500/30 rounded-lg p-3 inline-block mb-4">
                                    <FaClipboardList className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    System Logs
                                </h3>
                                <p className="text-orange-100 text-sm mt-1">
                                    View activity history
                                </p>
                            </div>
                        </div>

                        {/* Additional shortcut cards can be added here */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h3 className="text-white font-bold text-lg flex items-center">
                                    <FaChartBar className="mr-2" /> Analytics
                                    Overview
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    View detailed statistics and user data
                                </p>
                                <button
                                    className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 text-sm"
                                    onClick={() => navigate("/admin/analytics")}
                                >
                                    View Report
                                </button>
                            </div>

                            <div
                                className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6 shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 cursor-pointer"
                                onClick={() =>
                                    navigate(
                                        `/notes?adminDashboard=true&uploaderId=${admin?._id}`
                                    )
                                }
                            >
                                <div className="bg-teal-500/30 rounded-lg p-3 inline-block mb-4">
                                    <FaFileAlt className="text-white text-2xl" />
                                </div>
                                <h3 className="text-white font-bold text-lg">
                                    My Uploads
                                </h3>
                                <p className="text-teal-100 text-sm mt-1">
                                    View notes you've uploaded
                                </p>
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h3 className="text-white font-bold text-lg flex items-center">
                                    <FaUsers className="mr-2" /> User Management
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Manage users and permissions
                                </p>
                                <button
                                    className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 text-sm"
                                    onClick={() => navigate("/admin/users")}
                                >
                                    Manage Users
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent activities */}
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-white mb-4">
                            Recent Activities
                        </h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-700 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-start">
                                        <div
                                            className={`
                                            rounded-full p-2 mr-3
                                            ${
                                                activity.type === "user"
                                                    ? "bg-blue-900/40 text-blue-400"
                                                    : activity.type === "note"
                                                    ? "bg-green-900/40 text-green-400"
                                                    : activity.type ===
                                                      "feedback"
                                                    ? "bg-yellow-900/40 text-yellow-400"
                                                    : "bg-purple-900/40 text-purple-400"
                                            }
                                        `}
                                        >
                                            {activity.type === "user" ? (
                                                <FaUsers />
                                            ) : activity.type === "note" ? (
                                                <FaFileUpload />
                                            ) : activity.type === "feedback" ? (
                                                <FaComments />
                                            ) : (
                                                <FaCog />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white">
                                                {activity.action}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 text-sm">
                            View All Activities
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
