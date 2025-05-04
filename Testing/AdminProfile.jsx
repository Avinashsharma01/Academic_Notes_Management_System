/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaEdit,
    FaCamera,
    FaUserShield,
    FaBuilding,
    FaIdCard,
    FaCalendarAlt,
    FaCog,
} from "react-icons/fa";

const AdminProfile = () => {
    // Mock data - in a real app, you would fetch this from your backend
    const [admin, setAdmin] = useState({
        name: "Avinash Sharma",
        email: "admin@example.com",
        phone: "6201693634",
        address: "Meerut, India",
        role: "Super Admin",
        department: "IT Administration",
        adminId: "ADM-12345",
        joinDate: "January 10, 2023",
        lastLogin: "May 4, 2025 - 09:15 AM",
        profileImage: "https://avatars.githubusercontent.com/u/155890004?v=4",
    });

    // Stats data
    const stats = [
        {
            title: "Total Users",
            value: "1,234",
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
        },
        {
            title: "Notes Uploaded",
            value: "5,678",
            bgColor: "bg-gradient-to-r from-green-500 to-green-600",
        },
        {
            title: "Issues Resolved",
            value: "432",
            bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
        },
        {
            title: "System Uptime",
            value: "99.9%",
            bgColor: "bg-gradient-to-r from-amber-500 to-amber-600",
        },
    ];

    // Activity data
    const recentActivity = [
        {
            action: "Approved new user registration",
            time: "10 minutes ago",
            user: "jane.smith@example.com",
        },
        { action: "Deleted spam content", time: "1 hour ago", user: "system" },
        {
            action: "Updated system settings",
            time: "Yesterday at 4:30 PM",
            user: "admin",
        },
        {
            action: "Resolved user complaint #45928",
            time: "2 days ago",
            user: "support",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            {/* Header with background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative">
                <div className="max-w-7xl mx-auto mt-4 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Admin Profile
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Manage your profile and view your admin dashboard
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full -mb-36 -mr-36 z-0"></div>
                <div className="absolute top-12 right-32 w-16 h-16 bg-white/5 rounded-full z-0"></div>
                <div className="absolute bottom-12 left-16 w-24 h-24 bg-white/5 rounded-full z-0"></div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 relative">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <img
                                        src={admin.profileImage}
                                        alt="Admin profile"
                                        className="w-32 h-32 rounded-full border-4 border-white object-cover"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                                        <FaCamera className="text-blue-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {admin.name}
                            </h2>
                            <p className="text-blue-600 font-medium flex items-center justify-center gap-1 mt-1">
                                <FaUserShield className="text-blue-500" />
                                {admin.role}
                            </p>

                            <div className="flex items-center justify-center mt-3">
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                    Active Now
                                </span>
                            </div>

                            <div className="border-t border-gray-200 mt-6 pt-6">
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-700">
                                        <FaEnvelope className="text-gray-500 mr-3" />
                                        <span className="text-sm">
                                            {admin.email}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaPhone className="text-gray-500 mr-3" />
                                        <span className="text-sm">
                                            {admin.phone}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaMapMarkerAlt className="text-gray-500 mr-3" />
                                        <span className="text-sm">
                                            {admin.address}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <FaEdit />
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Admin details & stats */}
                    <div className="col-span-2 space-y-6">
                        {/* Admin details */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Admin Information
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <FaBuilding className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Department
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {admin.department}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <FaIdCard className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Admin ID
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {admin.adminId}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <FaCalendarAlt className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Join Date
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {admin.joinDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-100 p-3 rounded-lg">
                                        <FaCog className="text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Last Login
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {admin.lastLogin}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md overflow-hidden"
                                >
                                    <div
                                        className={`h-2 ${stat.bgColor}`}
                                    ></div>
                                    <div className="p-4">
                                        <p className="text-gray-500 text-sm">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent activity */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Recent Activity
                            </h2>

                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-800">
                                                {activity.action}
                                            </p>
                                            <span className="text-gray-500 text-sm">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            By: {activity.user}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                View All Activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
