/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const AuthButtons = ({
    toggleAuthDropdown,
    showAuthDropdown,
    authDropdownRef,
    setShowAuthDropdown,
}) => {
    return (
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
};

export default AuthButtons;
