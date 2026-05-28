/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import API from "../../Api/axiosInstance";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaEdit,
    FaCamera,
    FaUserGraduate,
    FaBuilding,
    FaIdCard,
    FaCalendarAlt,
    FaCog,
    FaFileAlt,
    FaSearch,
    FaTrash,
    FaBookOpen,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";

const AdminProfile = () => {
    // Use AuthContext to get admin data
    const { admin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [adminStats, setAdminStats] = useState({
        notesCount: 0,
        coursesCount: 0,
        queriesCount: 0,
        rating: "0.0",
    });

    // Use admin data from context or set a default empty object
    const [adminData, setAdminData] = useState({
        name: admin?.name || "Loading...",
        email: admin?.email || "Loading...",
        phone: admin?.phone || "Not Available",
        address: admin?.address || "Not Available",
        role: admin?.role || "Admin",
        course: admin?.course || "Not Available",
        department: admin?.department || "Not Available",
        college: admin?.college || "Not Available",
        designation: admin?.designation || "Not Available",
        isVerified: typeof admin?.isVerified === "boolean" ? admin.isVerified : null,
        adminId: admin?._id || admin?.id || "Loading...",
        joinDate: admin?.createdAt
            ? new Date(admin.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : "Not Available",
        lastLogin: "May 5, 2025 - 09:15 AM", // This could be updated with a real timestamp if available
        profileImage:
            admin?.profilePic ||
            "https://avatars.githubusercontent.com/u/155890004?v=4",
    });

    // Fetch admin details and stats
    useEffect(() => {
        const fetchAdminData = async () => {
            if (!admin) return;

            setLoading(true);
            try {
                // Get fresh admin data
                const response = await API.get("/auth/admin/me");

                if (response.data && response.data.admin) {
                    const freshAdminData = response.data.admin;

                    setAdminData({
                        name: freshAdminData.name || "Admin User",
                        email: freshAdminData.email || "Not Available",
                        phone: freshAdminData.phone || "Not Available",
                        address: freshAdminData.address || "Not Available",
                        role: freshAdminData.role || "Admin",
                        course: freshAdminData.course || "Not Available",
                        department:
                            freshAdminData.department || "Not Available",
                        college: freshAdminData.college || "Not Available",
                        designation:
                            freshAdminData.designation || "Not Available",
                        isVerified:
                            typeof freshAdminData.isVerified === "boolean"
                                ? freshAdminData.isVerified
                                : null,
                        adminId: freshAdminData._id || "Not Available",
                        joinDate: freshAdminData.createdAt
                            ? new Date(
                                freshAdminData.createdAt
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : "Not Available",
                        lastLogin: "May 5, 2025 - 09:15 AM", // Could update with real data if available
                        profileImage:
                            freshAdminData.profilePic ||
                            "https://avatars.githubusercontent.com/u/155890004?v=4",
                    });

                    // Optionally fetch admin stats
                    // This could be a separate API call to get statistics related to this admin
                    try {
                        // Example: Get count of notes created by this admin
                        const notesResponse = await API.get(
                            `/notes?uploaderId=${freshAdminData._id}`
                        );
                        const notesCount = notesResponse.data.length || 0;

                        // Update stats (other stats could be real data if you have endpoints for them)
                        setAdminStats({
                            notesCount: notesCount,
                            coursesCount: 12, // Example static data - replace with real API data when available
                            queriesCount: 57, // Example static data - replace with real API data when available
                            rating: "4.8/5", // Example static data - replace with real API data when available
                        });
                    } catch (statsError) {
                        console.error(
                            "Failed to fetch admin stats:",
                            statsError
                        );
                    }
                }
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [admin]);

    // Stats data
    const stats = [
        {
            title: "Notes Uploaded",
            value: adminStats.notesCount.toString(),
            bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
        },
        {
            title: "Courses Managed",
            value: adminStats.coursesCount.toString(),
            bgColor: "bg-gradient-to-r from-green-500 to-green-600",
        },
        {
            title: "Student Queries",
            value: adminStats.queriesCount.toString(),
            bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
        },
        {
            title: "Average Rating",
            value: adminStats.rating,
            bgColor: "bg-gradient-to-r from-amber-500 to-amber-600",
        },
    ];

    // Activity data
    const recentActivity = [
        {
            action: "Uploaded Operating Systems notes",
            time: "10 minutes ago",
            details: "CS101, Semester 4",
        },
        {
            action: "Updated Data Structures content",
            time: "1 hour ago",
            details: "CS203, Semester 3",
        },
        {
            action: "Deleted outdated Python materials",
            time: "Yesterday at 4:30 PM",
            details: "CS105, Semester 2",
        },
        {
            action: "Responded to student queries",
            time: "2 days ago",
            details: "Database Management notes",
        },
    ];

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-700">
                        Loading admin profile...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            {/* Header with background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative">
                <div className="max-w-7xl mx-auto mt-4 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        Admin Profile
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl">
                        Manage your profile and educational content
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
                                        src={adminData.profileImage}
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
                                {adminData.name}
                            </h2>
                            <p className="text-blue-600 font-medium flex items-center justify-center gap-1 mt-1">
                                <FaUserGraduate className="text-blue-500" />
                                {adminData.role}
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
                                            {adminData.email}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaPhone className="text-gray-500 mr-3" />
                                        <span className="text-sm">
                                            {adminData.phone}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaMapMarkerAlt className="text-gray-500 mr-3" />
                                        <span className="text-sm">
                                            {adminData.address}
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
                                    <div className="bg-cyan-100 p-3 rounded-lg">
                                        <FaBookOpen className="text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Course
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {adminData.course}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <FaBuilding className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Department
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {adminData.department}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-indigo-100 p-3 rounded-lg">
                                        <FaBuilding className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            College
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {adminData.college}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-emerald-100 p-3 rounded-lg">
                                        <FaUserGraduate className="text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Designation
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {adminData.designation}
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
                                            {adminData.adminId}
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
                                            {adminData.joinDate}
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
                                            {adminData.lastLogin}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-teal-100 p-3 rounded-lg">
                                        {adminData.isVerified ? (
                                            <FaCheckCircle className="text-teal-600" />
                                        ) : (
                                            <FaTimesCircle className="text-teal-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Verification Status
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {adminData.isVerified === null
                                                ? "Not Available"
                                                : adminData.isVerified
                                                    ? "Verified"
                                                    : "Not Verified"}
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

                        {/* Quick actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-xl transition-colors flex flex-col items-center gap-2">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <FaFileAlt className="text-blue-600 text-xl" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        Upload Notes
                                    </span>
                                </button>

                                <button className="bg-green-50 hover:bg-green-100 p-4 rounded-xl transition-colors flex flex-col items-center gap-2">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <FaEdit className="text-green-600 text-xl" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        Update Content
                                    </span>
                                </button>

                                <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-xl transition-colors flex flex-col items-center gap-2">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <FaSearch className="text-purple-600 text-xl" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        Find Notes
                                    </span>
                                </button>

                                <button className="bg-amber-50 hover:bg-amber-100 p-4 rounded-xl transition-colors flex flex-col items-center gap-2">
                                    <div className="bg-amber-100 p-3 rounded-full">
                                        <FaBookOpen className="text-amber-600 text-xl" />
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        View Courses
                                    </span>
                                </button>
                            </div>
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
                                            {activity.details}
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
