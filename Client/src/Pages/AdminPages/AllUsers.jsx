import { useState, useEffect } from "react";
// import AuthContext from "../../Context/AuthContext";
import API from "../../Api/axiosInstance";
import {
    FaSearch,
    FaUserCircle,
    FaCheckCircle,
    FaTimesCircle,
    FaChevronLeft,
    FaChevronRight,
    FaSort,
    FaCog,
    FaUsers,
    FaUserShield,
    FaUserPlus,
    FaFilter,
    FaDownload,
    FaTrash,
    FaEllipsisV,
} from "react-icons/fa";

const AllUsers = () => {
    // const { admin } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
        key: "name",
        direction: "ascending",
    });
    const usersPerPage = 8;

    // User statistics
    const [userStats, setUserStats] = useState({
        total: 0,
        verified: 0,
        unverified: 0,
        recentlyJoined: 0,
    });
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await API.get("/all/users");

                // Debug the response
                console.log("API Response:", response.data);

                // Ensure we're setting an array
                if (Array.isArray(response.data)) {
                    setUsers(response.data);

                    // Calculate statistics
                    const verified = response.data.filter(
                        (user) => user.isVerified
                    ).length;
                    const lastMonth = new Date();
                    lastMonth.setMonth(lastMonth.getMonth() - 1);
                    const recent = response.data.filter(
                        (user) => new Date(user.createdAt) > lastMonth
                    ).length;

                    setUserStats({
                        total: response.data.length,
                        verified: verified,
                        unverified: response.data.length - verified,
                        recentlyJoined: recent,
                    });
                } else if (
                    response.data &&
                    Array.isArray(response.data.users)
                ) {
                    // Some APIs nest the array in a data property
                    setUsers(response.data.users);

                    // Calculate statistics
                    const verified = response.data.users.filter(
                        (user) => user.isVerified
                    ).length;
                    const lastMonth = new Date();
                    lastMonth.setMonth(lastMonth.getMonth() - 1);
                    const recent = response.data.users.filter(
                        (user) => new Date(user.createdAt) > lastMonth
                    ).length;

                    setUserStats({
                        total: response.data.users.length,
                        verified: verified,
                        unverified: response.data.users.length - verified,
                        recentlyJoined: recent,
                    });
                } else {
                    console.error("Unexpected response format:", response.data);
                    setUsers([]);
                    setError("Received unexpected data format from server");
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setError("Failed to load users. Please try again later.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Sorting function
    const sortedUsers = Array.isArray(users)
        ? [...users].sort((a, b) => {
              if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;

              if (sortConfig.direction === "ascending") {
                  return a[sortConfig.key]
                      .toString()
                      .localeCompare(b[sortConfig.key].toString());
              }
              return b[sortConfig.key]
                  .toString()
                  .localeCompare(a[sortConfig.key].toString());
          })
        : [];

    // Request sort
    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // Search and filter
    const filteredUsers = sortedUsers.filter((user) => {
        return (
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.enrollment?.toString().includes(searchTerm)
        );
    });

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })}`;
    };

    // Stats cards
    const statsCards = [
        {
            title: "Total Users",
            value: userStats.total,
            icon: <FaUsers className="text-blue-400" />,
            change: `${Math.round(
                (userStats.recentlyJoined / (userStats.total || 1)) * 100
            )}%`,
            bgColor: "from-blue-500 to-blue-600",
        },
        {
            title: "Verified Users",
            value: userStats.verified,
            icon: <FaCheckCircle className="text-green-400" />,
            change: `${Math.round(
                (userStats.verified / (userStats.total || 1)) * 100
            )}%`,
            bgColor: "from-green-500 to-green-600",
        },
        {
            title: "Pending Verification",
            value: userStats.unverified,
            icon: <FaTimesCircle className="text-red-400" />,
            change: `${Math.round(
                (userStats.unverified / (userStats.total || 1)) * 100
            )}%`,
            bgColor: "from-red-500 to-red-600",
        },
        {
            title: "Recent Joins",
            value: userStats.recentlyJoined,
            icon: <FaUserPlus className="text-purple-400" />,
            change: "Last 30 days",
            bgColor: "from-purple-500 to-purple-600",
        },
    ];
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-400 text-lg font-medium">
                        Loading users...
                    </p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg max-w-md w-full">
                    <div className="bg-red-900/30 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <FaTimesCircle className="text-red-500 text-4xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-4 text-white">
                        Error Loading Users
                    </h2>
                    <p className="text-gray-400 text-center mb-6">{error}</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Try Again
                        </button>{" "}
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {" "}
            {/* Header with search and quick actions */}
            <div className="bg-gray-800 p-6 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="mr-4 bg-amber-500/20 p-3 rounded-lg">
                                <FaUsers className="text-amber-400 text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    User Management
                                </h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    Manage and monitor user accounts
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 transition-all duration-300 focus:w-72"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>

                            <button className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105">
                                <FaFilter className="text-lg" />
                            </button>

                            <button className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105">
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
                    {statsCards.map((stat, index) => (
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
                                        {stat.title === "Recent Joins"
                                            ? ""
                                            : " of total"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Users table card */}
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
                    {" "}
                    {/* Card Header */}
                    <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/80 flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold text-white mb-4 sm:mb-0 flex items-center">
                            All Users
                            <span className="bg-blue-900/60 text-blue-300 ml-3 py-1 px-3 rounded-full text-xs flex items-center">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                                {filteredUsers.length} Users
                            </span>
                        </h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 flex items-center text-sm transition-all duration-200 hover:shadow-md">
                                <FaDownload className="mr-2" /> Export CSV
                            </button>
                            <button className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 flex items-center text-sm transition-all duration-200 hover:shadow-md">
                                <FaUserPlus className="mr-2" /> Add User
                            </button>
                        </div>
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        {" "}
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        <button
                                            className="flex items-center hover:text-blue-400 transition-colors"
                                            onClick={() => requestSort("name")}
                                        >
                                            Student <FaSort className="ml-1" />
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        <button
                                            className="flex items-center hover:text-blue-400 transition-colors"
                                            onClick={() => requestSort("email")}
                                        >
                                            Email <FaSort className="ml-1" />
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        <button
                                            className="flex items-center hover:text-blue-400 transition-colors"
                                            onClick={() =>
                                                requestSort("course")
                                            }
                                        >
                                            Course <FaSort className="ml-1" />
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        <button
                                            className="flex items-center hover:text-blue-400 transition-colors"
                                            onClick={() =>
                                                requestSort("branch")
                                            }
                                        >
                                            Branch <FaSort className="ml-1" />
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        Enrollment
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        Verification
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        <button
                                            className="flex items-center hover:text-blue-400 transition-colors"
                                            onClick={() =>
                                                requestSort("createdAt")
                                            }
                                        >
                                            Joined <FaSort className="ml-1" />
                                        </button>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {user.profilePic ? (
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={
                                                                    user.profilePic
                                                                }
                                                                alt={user.name}
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-gray-700/50 flex items-center justify-center text-gray-300">
                                                                <FaUserCircle className="h-7 w-7" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            {user.role ===
                                                            "student" ? (
                                                                <span className="px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300 inline-flex items-center">
                                                                    <FaUserCircle className="mr-1" />{" "}
                                                                    Student
                                                                </span>
                                                            ) : user.role ===
                                                              "admin" ? (
                                                                <span className="px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 inline-flex items-center">
                                                                    <FaUserShield className="mr-1" />{" "}
                                                                    Admin
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                                                                    {user.role}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {user.course}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {user.branch}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {user.enrollment}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.isVerified ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/20 text-green-400">
                                                        <FaCheckCircle className="mr-1" />{" "}
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/20 text-red-400">
                                                        <FaTimesCircle className="mr-1" />{" "}
                                                        Not Verified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {formatDate(user.createdAt)}
                                            </td>{" "}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="p-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/60 transition-all duration-200 transform hover:scale-105"
                                                        title="Change Role"
                                                    >
                                                        <FaUserShield />
                                                    </button>
                                                    <button
                                                        className="p-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/60 transition-all duration-200 transform hover:scale-105"
                                                        title="Delete User"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                    <button
                                                        className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
                                                        title="More Options"
                                                    >
                                                        <FaEllipsisV />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-20 text-center"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="bg-gray-700/30 rounded-full p-6 mb-4">
                                                    <FaSearch className="text-gray-500 text-4xl" />
                                                </div>
                                                <p className="text-gray-400 font-medium mb-2">
                                                    No users found
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    Try adjusting your search or
                                                    filter criteria
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>{" "}
                    {/* Pagination */}
                    {filteredUsers.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between">
                            <div className="text-sm text-gray-400 mb-4 sm:mb-0">
                                Showing {indexOfFirstUser + 1} to{" "}
                                {Math.min(
                                    indexOfLastUser,
                                    filteredUsers.length
                                )}{" "}
                                of {filteredUsers.length} users
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === 1
                                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                                    }`}
                                >
                                    <FaChevronLeft />
                                </button>

                                {/* Page numbers */}
                                <div className="flex space-x-1">
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNum = index + 1;
                                        // Show only a window of 5 page numbers
                                        if (
                                            pageNum === 1 ||
                                            pageNum === totalPages ||
                                            (pageNum >= currentPage - 1 &&
                                                pageNum <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() =>
                                                        setCurrentPage(pageNum)
                                                    }
                                                    className={`px-3 py-1 rounded ${
                                                        currentPage === pageNum
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        } else if (
                                            pageNum === currentPage - 2 ||
                                            pageNum === currentPage + 2
                                        ) {
                                            return (
                                                <span
                                                    key={pageNum}
                                                    className="px-1 text-gray-500"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === totalPages
                                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                                    }`}
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

export default AllUsers;
