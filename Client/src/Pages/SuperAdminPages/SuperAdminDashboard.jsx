import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/axiosInstance";
import AuthContext from "../../Context/AuthContext";
import {
    FaUsers,
    FaUserShield,
    FaShieldAlt,
    FaComments,
    FaCheckCircle,
    FaTimesCircle,
    FaTrash,
    FaSearch,
    FaSpinner,
    FaSignOutAlt,
    FaUserPlus,
    FaClipboardList,
    FaChartBar,
    FaChevronLeft,
    FaChevronRight,
    FaToggleOn,
    FaToggleOff,
} from "react-icons/fa";

const SuperAdminDashboard = () => {
    const { superAdmin, superAdminLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [actionLoading, setActionLoading] = useState(null);
    const itemsPerPage = 8;

    // Fetch data on mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [statsRes, usersRes, adminsRes] = await Promise.all([
                API.get("/superadmin/stats"),
                API.get("/superadmin/users"),
                API.get("/superadmin/admins"),
            ]);
            setStats(statsRes.data);
            setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
            setAdmins(Array.isArray(adminsRes.data) ? adminsRes.data : []);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        setActionLoading(id);
        try {
            await API.delete(`/superadmin/users/${id}`);
            setUsers(users.filter((u) => u._id !== id));
            if (stats) {
                setStats({
                    ...stats,
                    users: { ...stats.users, total: stats.users.total - 1 },
                });
            }
        } catch (err) {
            console.error("Delete user error:", err);
            alert("Failed to delete user.");
        } finally {
            setActionLoading(null);
        }
    };

    // Toggle user verification
    const handleToggleUserVerify = async (id) => {
        setActionLoading(id);
        try {
            const { data } = await API.put(`/superadmin/users/${id}/verify`);
            setUsers(users.map((u) => (u._id === id ? { ...u, isVerified: !u.isVerified } : u)));
        } catch (err) {
            console.error("Toggle user verify error:", err);
            alert("Failed to update verification.");
        } finally {
            setActionLoading(null);
        }
    };

    // Delete admin
    const handleDeleteAdmin = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin? This action cannot be undone.")) return;
        setActionLoading(id);
        try {
            await API.delete(`/superadmin/admins/${id}`);
            setAdmins(admins.filter((a) => a._id !== id));
            if (stats) {
                setStats({
                    ...stats,
                    admins: { ...stats.admins, total: stats.admins.total - 1 },
                });
            }
        } catch (err) {
            console.error("Delete admin error:", err);
            alert("Failed to delete admin.");
        } finally {
            setActionLoading(null);
        }
    };

    // Toggle admin verification
    const handleToggleAdminVerify = async (id) => {
        setActionLoading(id);
        try {
            await API.put(`/superadmin/admins/${id}/verify`);
            setAdmins(admins.map((a) => (a._id === id ? { ...a, isVerified: !a.isVerified } : a)));
        } catch (err) {
            console.error("Toggle admin verify error:", err);
            alert("Failed to update verification.");
        } finally {
            setActionLoading(null);
        }
    };

    // // Logout
    // const handleLogout = async () => {
    //     await superAdminLogout();
    //     navigate("/superadmin/login");
    // };

    // Filter + Paginate
    const currentData = activeTab === "users" ? users : admins;
    const filtered = currentData.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page on tab/search change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 to-gray-800">
                <FaSpinner className="animate-spin text-5xl text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white">
            {/* Header */}
            <div className="bg-gray-800/80 border-b border-purple-500/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-600/20 p-3 rounded-lg">
                            <FaShieldAlt className="text-purple-400 text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">SuperAdmin Dashboard</h1>
                            <p className="text-gray-400 text-sm">
                                Welcome, <span className="text-purple-400">{superAdmin?.name}</span>
                            </p>
                        </div>
                    </div>
                    {/* <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button> */}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Error */}
                {error && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded-lg mb-6 flex items-center">
                        <FaTimesCircle className="mr-2" />
                        {error}
                        <button onClick={fetchDashboardData} className="ml-auto px-3 py-1 bg-red-600/30 rounded hover:bg-red-600/50">
                            Retry
                        </button>
                    </div>
                )}

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Students" value={stats.users.total} icon={<FaUsers className="text-blue-400" />} sub={`${stats.users.verified} verified`} color="blue" />
                        <StatCard title="Unverified Students" value={stats.users.unverified} icon={<FaTimesCircle className="text-orange-400" />} sub={`${stats.users.recentlyJoined} new this month`} color="orange" />
                        <StatCard title="Total Admins" value={stats.admins.total} icon={<FaUserShield className="text-purple-400" />} sub={`${stats.admins.verified} verified`} color="purple" />
                        <StatCard title="Unverified Admins" value={stats.admins.unverified} icon={<FaTimesCircle className="text-red-400" />} sub={`${stats.admins.recentlyJoined} new this month`} color="red" />
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <button
                        onClick={() => navigate("/superadmin/academic")}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg shadow-purple-600/20 font-medium"
                    >
                        <FaUserPlus />
                        Manage Academic Data (Sessions, Courses, Branches, Semesters, Subjects)
                    </button>
                    <button
                        onClick={() => navigate("/superadmin/feedback")}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-yellow-600 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-600/20 font-medium"
                    >
                        <FaComments />
                        View Feedback
                    </button>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">System Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700/50">
                            <h3 className="text-white font-bold text-lg flex items-center">
                                <FaClipboardList className="mr-2 text-orange-400" />
                                System Logs
                            </h3>
                            <p className="text-gray-400 text-sm mt-2">
                                Monitor platform activity and system events.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700/50">
                            <h3 className="text-white font-bold text-lg flex items-center">
                                <FaChartBar className="mr-2 text-purple-400" />
                                Analytics Overview
                            </h3>
                            <p className="text-gray-400 text-sm mt-2">
                                Review high-level usage and platform performance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "users"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                    >
                        <FaUsers />
                        Students ({users.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("admins")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "admins"
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                    >
                        <FaUserShield />
                        Admins ({admins.length})
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <FaSearch className="absolute left-4 top-3.5 text-gray-500" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-96 bg-gray-800 text-white pl-11 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {/* Data Table */}
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700/50">
                    <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            {activeTab === "users" ? <FaUsers className="text-blue-400" /> : <FaUserShield className="text-purple-400" />}
                            {activeTab === "users" ? "All Students" : "All Admins"}
                            <span className="bg-gray-700 text-gray-300 px-3 py-0.5 rounded-full text-xs ml-2">
                                {filtered.length}
                            </span>
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                                    {activeTab === "users" && (
                                        <>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Course</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Branch</th>
                                        </>
                                    )}
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {paginated.length > 0 ? (
                                    paginated.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                                                        {item.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                    <div className="text-sm font-medium text-white">{item.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.email}</td>
                                            {activeTab === "users" && (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.course || "—"}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.branch || "—"}</td>
                                                </>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.isVerified ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                                                        <FaCheckCircle className="mr-1" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                                                        <FaTimesCircle className="mr-1" /> Unverified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {formatDate(item.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => activeTab === "users" ? handleToggleUserVerify(item._id) : handleToggleAdminVerify(item._id)}
                                                        disabled={actionLoading === item._id}
                                                        className={`p-2 rounded-lg transition-all ${item.isVerified
                                                            ? "bg-orange-900/30 text-orange-400 hover:bg-orange-900/50"
                                                            : "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                                                            }`}
                                                        title={item.isVerified ? "Unverify" : "Verify"}
                                                    >
                                                        {actionLoading === item._id ? (
                                                            <FaSpinner className="animate-spin" />
                                                        ) : item.isVerified ? (
                                                            <FaToggleOn />
                                                        ) : (
                                                            <FaToggleOff />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => activeTab === "users" ? handleDeleteUser(item._id) : handleDeleteAdmin(item._id)}
                                                        disabled={actionLoading === item._id}
                                                        className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-all"
                                                        title="Delete"
                                                    >
                                                        {actionLoading === item._id ? (
                                                            <FaSpinner className="animate-spin" />
                                                        ) : (
                                                            <FaTrash />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={activeTab === "users" ? 7 : 5} className="px-6 py-16 text-center">
                                            <FaSearch className="mx-auto text-4xl text-gray-600 mb-3" />
                                            <p className="text-gray-400">No {activeTab} found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-700 flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                                Page {currentPage} of {totalPages} — {filtered.length} total
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Reusable stat card component
const StatCard = ({ title, value, icon, sub, color }) => {
    const colorMap = {
        blue: "from-blue-500 to-blue-600",
        orange: "from-orange-500 to-orange-600",
        purple: "from-purple-500 to-purple-600",
        red: "from-red-500 to-red-600",
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700/50">
            <div className={`h-1 bg-linear-to-r ${colorMap[color]}`}></div>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-sm">{title}</p>
                        <p className="text-3xl font-bold text-white mt-1">{value}</p>
                    </div>
                    <div className="p-3 bg-gray-700/50 rounded-lg">
                        {icon}
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-3">{sub}</p>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
