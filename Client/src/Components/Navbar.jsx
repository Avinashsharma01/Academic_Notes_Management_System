import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../Context/AuthContext";
import { ImMenu } from "react-icons/im";
import {
    FaUser,
    FaSignOutAlt,
    FaChevronDown,
    FaUserShield,
    FaUserCircle,
} from "react-icons/fa";

const PROFILE_IMAGE_URL =
    "https://media.istockphoto.com/id/588348500/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=U7ZWuV1XqwbsejEMF3lIKzUSeSBOex3iiYoicFQUr2A=";

const Navbar = () => {
    const { user, logout, admin, Adminlogout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAuthDropdown, setShowAuthDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const profileRef = useRef(null);
    const authDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }
            if (
                authDropdownRef.current &&
                !authDropdownRef.current.contains(event.target)
            ) {
                setShowAuthDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        admin ? Adminlogout() : logout();
        setShowProfile(false);
    };

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
    };

    const toggleAuthDropdown = () => {
        setShowAuthDropdown((prev) => !prev);
    };

    const renderAuthButtons = () => (
        <>
            {/* Desktop View */}
            <div className="hidden md:flex items-center gap-3">
                <NavLink
                    to="/signup"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                    Sign Up
                </NavLink>
                <NavLink
                    to="/login"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                    Login
                </NavLink>
                <NavLink
                    to="/adminLogin"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                    Admin
                </NavLink>
            </div>

            {/* Tablet and Mobile View */}
            <div className="md:hidden" ref={authDropdownRef}>
                <button
                    onClick={toggleAuthDropdown}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg flex items-center gap-1 shadow-md"
                >
                    Auth
                    <FaChevronDown
                        className={`ml-1 transition-transform duration-200 ${
                            showAuthDropdown ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {showAuthDropdown && (
                    <div className="absolute right-6 mt-2 bg-white shadow-xl rounded-lg p-3 flex flex-col gap-2 z-50 transform transition-all duration-200 ease-out">
                        <NavLink
                            to="/signup"
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 px-5 py-2 rounded-lg text-white font-medium text-center transition-colors"
                            onClick={() => setShowAuthDropdown(false)}
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 px-5 py-2 rounded-lg text-white font-medium text-center transition-colors"
                            onClick={() => setShowAuthDropdown(false)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/adminLogin"
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 px-5 py-2 rounded-lg text-white font-medium text-center transition-colors"
                            onClick={() => setShowAuthDropdown(false)}
                        >
                            Admin Login
                        </NavLink>
                    </div>
                )}
            </div>
        </>
    );

    const renderProfileDropdown = () => (
        <div className="relative" ref={profileRef}>
            <button
                onClick={toggleProfile}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
            >
                <img
                    src={PROFILE_IMAGE_URL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="md:inline hidden">
                    {admin ? admin.name : user.name}
                </span>
                <FaChevronDown
                    className={`transition-transform duration-200 ${
                        showProfile ? "rotate-180" : ""
                    }`}
                />
            </button>

            {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-xl rounded-lg overflow-hidden z-50 transform transition-all duration-300 ease-out animate-fadeIn">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                            <img
                                src={PROFILE_IMAGE_URL}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <div>
                                <p className="font-bold text-lg">
                                    {admin ? admin.name : user.name}
                                </p>
                                <p className="text-sm text-blue-100">
                                    {admin ? "Administrator" : "Student"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3">
                        {admin && (
                            <div>
                                <button
                                    onClick={() => {
                                        navigate("/admin/admindashboard");
                                        setShowProfile(false);
                                    }}
                                    className="flex w-full items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FaUserShield className="text-indigo-600" />
                                    <span>Admin Dashboard</span>
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/adminprofile");
                                        setShowProfile(false);
                                    }}
                                    className="flex w-full items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FaUser className="text-indigo-600" />
                                    <span>Admin Profile</span>
                                </button>
                            </div>
                        )}

                        {user && (
                            <div>
                                <p className="text-gray-500 px-2 py-1">
                                    {user.email}
                                </p>

                                <button
                                    onClick={() => {
                                        navigate("/userprofile");
                                        setShowProfile(false);
                                    }}
                                    className="flex w-full items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FaUserCircle className="text-indigo-600" />
                                    <span>My Profile</span>
                                </button>
                            </div>
                        )}

                        <div className="border-t border-gray-200 mt-2 pt-2">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <nav
            className={`${
                scrolled
                    ? "bg-gradient-to-r from-gray-900 to-slate-900 shadow-lg"
                    : "bg-gradient-to-r from-gray-800 to-slate-800"
            } 
            w-full py-3 text-white flex justify-between items-center sticky top-0 left-0 z-40 px-4 sm:px-8 transition-all duration-300`}
        >
            <div className="flex items-center">
                <button
                    className="mr-3 p-2 rounded-lg text-2xl lg:hidden hover:bg-white/10 transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <ImMenu />
                </button>

                <NavLink to="/" className="flex items-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
                        Hellomates
                    </div>
                </NavLink>
            </div>

            {/* Navigation Links */}
            <div
                className={`${
                    showMenu
                        ? "max-lg:flex max-lg:flex-col max-lg:absolute max-lg:top-16 max-lg:left-0 max-lg:right-0 max-lg:bg-gradient-to-b max-lg:from-slate-800 max-lg:to-gray-900 max-lg:p-4 max-lg:shadow-xl max-lg:z-30 max-lg:animate-slideDown"
                        : "max-lg:hidden"
                } lg:flex lg:items-center lg:space-x-1`}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    }
                    onClick={() => setShowMenu(false)}
                >
                    Home
                </NavLink>

                {(user || admin) && (
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                                : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        }
                        onClick={() => setShowMenu(false)}
                    >
                        Dashboard
                    </NavLink>
                )}

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    }
                    onClick={() => setShowMenu(false)}
                >
                    About
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    }
                    onClick={() => setShowMenu(false)}
                >
                    Contact
                </NavLink>

                <NavLink
                    to="/service"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    }
                    onClick={() => setShowMenu(false)}
                >
                    Services
                </NavLink>

                <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    }
                    onClick={() => setShowMenu(false)}
                >
                    Feedback
                </NavLink>

                <NavLink
                    to="/events"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white font-semibold bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            : "text-gray-200 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                    }
                    onClick={() => setShowMenu(false)}
                >
                    Events
                </NavLink>
            </div>

            {/* Auth or Profile Section */}
            <div className="flex items-center">
                {user || admin ? renderProfileDropdown() : renderAuthButtons()}
            </div>
        </nav>
    );
};

export default Navbar;
