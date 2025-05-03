import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { ImMenu } from "react-icons/im";

const PROFILE_IMAGE_URL =
    "https://media.istockphoto.com/id/588348500/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=U7ZWuV1XqwbsejEMF3lIKzUSeSBOex3iiYoicFQUr2A=";

const Navbar = () => {
    const { user, logout, admin, Adminlogout } = useContext(AuthContext);
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
                    className="bg-yellow-500 px-3 rounded-2xl p-1"
                >
                    Signup
                </NavLink>
                <NavLink
                    to="/login"
                    className="bg-green-600 px-5 rounded-2xl p-1"
                >
                    Login
                </NavLink>
                <NavLink
                    to="/adminLogin"
                    className="bg-blue-600 px-5 rounded-2xl p-1"
                >
                    Admin Login
                </NavLink>
            </div>

            <div className="phone relative sm:hidden">
                <button
                    onClick={toggleAuthDropdown}
                    className="bg-blue-500 px-4 py-1 rounded-3xl flex items-center gap-2"
                >
                    Auth
                </button>
                {showAuthDropdown && (
                    <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md p-3 flex flex-col gap-2">
                        <NavLink
                            to="/signup"
                            className="bg-yellow-500 px-3 rounded-2xl p-1 text-center text-white"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Signup
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="bg-green-600 px-5 rounded-2xl p-1 text-center text-white"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/adminLogin"
                            className="bg-blue-600 px-5 rounded-2xl p-1 text-center text-white"
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
            <button className="bg-blue-500 px-2 py-2 rounded-3xl flex items-center gap-2 max-sm:w-24 max-sm:h-8">
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
                    className="absolute right-0 mt-2 min-w-48 w-auto bg-white text-black shadow-lg rounded-md p-3"
                    onMouseEnter={handleProfileMouseEnter}
                    onMouseLeave={handleProfileMouseLeave}
                >
                    <p className="font-bold text-center">
                        {admin ? "Welcome Admin" : "Welcome Mates"}
                    </p>
                    {admin && (
                        <div className="text-sm text-gray-500 cursor-pointer">
                            <p
                                onClick={() =>
                                    navigate("/admin/admindashboard")
                                }
                            >
                                {admin ? "Admin Panel" : user.email}
                            </p>
                            <hr className="my-2" />
                            <span
                                className="text-sm text-gray-500 cursor-pointer "
                                onClick={() => navigate("/adminprofile")}
                            >
                                Admin Profile
                            </span>
                        </div>
                    )}

                    {user && (
                        <div className="text-sm text-gray-500 text-center">
                            <p>{user ? user.email : "Admin Panel"}</p>
                            <hr className="my-2" />
                            <span
                                className="text-sm text-gray-500 cursor-pointer "
                                onClick={() => navigate("/userprofile")}
                            >
                                User Profile
                            </span>
                        </div>
                    )}
                    <hr className="my-2" />
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white w-full py-1 rounded-md cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <nav className="bg-[#1E2A38] z-20 w-full h-[70px] text-white flex  flex-wrap justify-around items-center sticky top-0 left-0 ">
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
                } max-md:absolute top-17 z-10 max-md:bg-blue-400 max-sm:text-sm flex justify-center items-center max-md:w-[100%] flex-wrap max-md:flex-col max-md:gap-8`}
                onClick={toggleMenu}
            >
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                            : "px-3 font-bold"
                    }
                >
                    Home
                </NavLink>

                {(user || admin) && (
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                                : "px-3 font-bold"
                        }
                    >
                        Dashboard
                    </NavLink>
                )}
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                            : "px-3 font-bold"
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                            : "px-3 font-bold"
                    }
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/service"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                            : "px-3 font-bold"
                    }
                >
                    Services
                </NavLink>
                <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                            : "px-3 font-bold"
                    }
                >
                    Feedback
                </NavLink>
                <NavLink
                    to="/events"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                            : "px-3 font-bold"
                    }
                >
                    Events
                </NavLink>
            </div>

            {user || admin ? renderProfileDropdown() : renderAuthButtons()}
        </nav>
    );
};

export default Navbar;
