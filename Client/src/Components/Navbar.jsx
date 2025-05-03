import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { ImMenu } from "react-icons/im";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../Context/ThemeContext";

const PROFILE_IMAGE_URL =
    "https://media.istockphoto.com/id/588348500/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=U7ZWuV1XqwbsejEMF3lIKzUSeSBOex3iiYoicFQUr2A=";

const Navbar = () => {
    const { user, logout, admin, Adminlogout } = useContext(AuthContext);
    const { isDarkMode } = useTheme();
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAuthDropdown, setShowAuthDropdown] = useState(false); // State for Auth dropdown
    let profileTimeout;

    // use naviagate for navigating from this page to another page
    const navigate = useNavigate();

    const handleLogout = () => {
        admin ? Adminlogout() : logout();
    };

    const toggleMenu = () => {
        if (window.innerWidth <= 768) {
            setShowMenu((prev) => !prev);
        }
    };

    const handleProfileMouseEnter = () => {
        clearTimeout(profileTimeout);
        setShowProfile(true);
    };

    const handleProfileMouseLeave = () => {
        profileTimeout = setTimeout(() => setShowProfile(false), 100);
    };

    const toggleAuthDropdown = () => {
        setShowAuthDropdown((prev) => !prev); // Toggle Auth dropdown visibility
    };

    const renderAuthButtons = () => (
        <>
            {/* Desktop View */}
            <div className="desktop flex justify-center items-center gap-5 max-sm:hidden">
                <NavLink
                    to="/signup"
                    className="bg-primary-500 px-3 rounded-lg p-1 hover:bg-primary-600 transition-colors"
                >
                    Signup
                </NavLink>
                <NavLink
                    to="/login"
                    className="bg-success-500 px-5 rounded-lg p-1 hover:bg-success-600 transition-colors"
                >
                    Login
                </NavLink>
                <NavLink
                    to="/adminLogin"
                    className="bg-accent-500 px-5 rounded-lg p-1 hover:bg-accent-600 transition-colors"
                >
                    Admin Login
                </NavLink>
            </div>

            <div className="phone relative sm:hidden">
                <button
                    onClick={toggleAuthDropdown}
                    className="bg-primary-500 px-4 py-1 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors"
                >
                    Auth
                </button>
                {showAuthDropdown && (
                    <div className="absolute right-0 mt-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-lg rounded-md p-3 flex flex-col gap-2">
                        <NavLink
                            to="/signup"
                            className="bg-primary-500 px-3 rounded-lg p-1 text-center text-white hover:bg-primary-600 transition-colors"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Signup
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="bg-success-500 px-5 rounded-lg p-1 text-center text-white hover:bg-success-600 transition-colors"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/adminLogin"
                            className="bg-accent-500 px-5 rounded-lg p-1 text-center text-white hover:bg-accent-600 transition-colors"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Admin Login
                        </NavLink>
                    </div>
                )}
            </div>
        </>
    );

    const renderProfileDropdown = () => (
        <div
            className="relative"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
        >
            <button className="bg-primary-500 px-2 py-2 rounded-lg flex items-center gap-2 max-sm:w-24 max-sm:h-8 hover:bg-primary-600 transition-colors">
                <img
                    src={PROFILE_IMAGE_URL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                />
                <span className="max-sm:text-[60%]">
                    {admin ? admin.name : user.name}
                </span>
            </button>
            {showProfile && (
                <div
                    className="absolute right-0 mt-2 min-w-48 w-auto bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-soft rounded-md p-3"
                    onMouseEnter={handleProfileMouseEnter}
                    onMouseLeave={handleProfileMouseLeave}
                >
                    <p className="font-bold text-center">
                        {admin ? "Welcome Admin" : "Welcome Mates"}
                    </p>
                    {admin && (
                        <div className="text-sm text-neutral-500 dark:text-neutral-300 cursor-pointer">
                            <p
                                onClick={() =>
                                    navigate("/admin/admindashboard")
                                }
                            >
                                {admin ? "Admin Panel" : user.email}
                            </p>
                            <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                            <span
                                className="text-sm cursor-pointer"
                                onClick={() => navigate("/adminprofile")}
                            >
                                Admin Profile
                            </span>
                        </div>
                    )}

                    {user && (
                        <div className="text-sm text-neutral-500 dark:text-neutral-300 text-center">
                            <p>{user ? user.email : "Admin Panel"}</p>
                            <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                            <span
                                className="text-sm cursor-pointer"
                                onClick={() => navigate("/userprofile")}
                            >
                                User Profile
                            </span>
                        </div>
                    )}
                    <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                    <button
                        onClick={handleLogout}
                        className="bg-error-500 text-white w-full py-1 rounded-md cursor-pointer hover:bg-error-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <nav className={`${isDarkMode ? 'bg-neutral-900' : 'bg-primary-800'} z-20 w-full h-[70px] text-white flex flex-wrap justify-around items-center sticky top-0 left-0 transition-colors duration-300`}>
            <ImMenu
                className="text-3xl md:hidden cursor-pointer"
                onClick={toggleMenu}
            />

            <div className="logo">
                <h1 className="text-3xl font-bold max-sm:text-[1.5em]">
                    Hellomates
                </h1>
            </div>

            <div
                className={`navpages gap-3 ${
                    showMenu ? "p-4" : "max-md:hidden"
                } max-md:absolute top-17 z-10 max-md:bg-primary-700 dark:max-md:bg-neutral-800 max-sm:text-sm flex justify-center items-center max-md:w-[100%] flex-wrap max-md:flex-col max-md:gap-8 transition-colors duration-300`}
                onClick={toggleMenu}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                            : "px-3 font-bold hover:text-primary-200 transition-colors"
                    }
                >
                    Home
                </NavLink>

                {(user || admin) && (
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                                : "px-3 font-bold hover:text-primary-200 transition-colors"
                        }
                    >
                        Dashboard
                    </NavLink>
                )}
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                            : "px-3 font-bold hover:text-primary-200 transition-colors"
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                            : "px-3 font-bold hover:text-primary-200 transition-colors"
                    }
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/service"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                            : "px-3 font-bold hover:text-primary-200 transition-colors"
                    }
                >
                    Services
                </NavLink>
                <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                            : "px-3 font-bold hover:text-primary-200 transition-colors"
                    }
                >
                    Feedback
                </NavLink>
                <NavLink
                    to="/events"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-primary-500 font-bold bg-white dark:bg-neutral-900 p-1 rounded-lg"
                            : "px-3 font-bold hover:text-primary-200 transition-colors"
                    }
                >
                    Events
                </NavLink>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                {user || admin ? renderProfileDropdown() : renderAuthButtons()}
            </div>
        </nav>
    );
};

export default Navbar;
