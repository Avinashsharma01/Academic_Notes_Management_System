/* eslint-disable react/prop-types */

// import { useNavigate } from "react-router-dom";
import {
    FaChevronDown,
    FaUserShield,
    FaUser,
    FaUserCircle,
    FaSignOutAlt,
    FaShieldAlt,
} from "react-icons/fa";
import { PROFILE_IMAGE_URL } from "./constants";

const ProfileDropdown = ({
    toggleProfile,
    showProfile,
    profileRef,
    admin,
    user,
    superAdmin,
    handleLogout,
    navigate,
    setShowProfile,
}) => {
    return (
        <div className="relative" ref={profileRef}>
            <button
                onClick={toggleProfile}
                className="bg-linear-to-r from-blue-500 to-indigo-600 px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
            >
                <img
                    src={PROFILE_IMAGE_URL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="md:inline hidden">
                    {superAdmin ? superAdmin.name : admin ? admin.name : user?.name}
                </span>
                <FaChevronDown
                    className={`transition-transform duration-200 ${showProfile ? "rotate-180" : ""
                        }`}
                />
            </button>

            {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-xl rounded-lg overflow-hidden z-50 transform transition-all duration-300 ease-out animate-fadeIn">
                    <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                            <img
                                src={PROFILE_IMAGE_URL}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <div>
                                <p className="font-bold text-lg">
                                    {superAdmin ? superAdmin.name : admin ? admin.name : user?.name}
                                </p>
                                <p className="text-sm text-blue-100">
                                    {superAdmin ? "SuperAdmin" : admin ? "Administrator" : "Student"}
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
                                    <span className="cursor-pointer">
                                        Admin Dashboard
                                    </span>
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/adminprofile");
                                        setShowProfile(false);
                                    }}
                                    className="flex w-full items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FaUser className="text-indigo-600" />
                                    <span className="cursor-pointer">
                                        Admin Profile
                                    </span>
                                </button>
                            </div>
                        )}

                        {superAdmin && (
                            <div>
                                <button
                                    onClick={() => {
                                        navigate("/dashboard");
                                        setShowProfile(false);
                                    }}
                                    className="flex w-full items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FaShieldAlt className="text-purple-600" />
                                    <span className="cursor-pointer">
                                        Dashboard
                                    </span>
                                </button>
                            </div>
                        )}

                        {user && (
                            <div>
                                <p className="text-gray-500 text-sm px-2 py-1">
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
};

export default ProfileDropdown;
