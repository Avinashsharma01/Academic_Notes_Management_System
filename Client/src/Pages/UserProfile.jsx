/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import API from "../Api/axiosInstance";
import {
    FaUser,
    FaEnvelope,
    FaUserTag,
    FaCalendarAlt,
    FaCamera,
    FaPencilAlt,
    FaSignOutAlt,
} from "react-icons/fa";

const UserProfile = () => {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setUpdateError] = useState(false);

    const token = localStorage.getItem("authToken");

    // Fetch user details
    useEffect(() => {
        if (!token) return;
        API.get("/auth/me", {
            headers: { Authorization: token },
        })
            .then((res) => {
                setProfile(res.data.user);
                setNewName(res.data.user.name);
                setPreviewImage(res.data.user.profilePic);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [token]);

    // Handle file selection for profile picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProfilePic(file);
        setPreviewImage(URL.createObjectURL(file)); // Preview the image before uploading
    };

    // Handle name & profile picture update
    const handleUpdate = async () => {
        setUpdateSuccess(false);
        setUpdateError(false);

        // Uncomment this when the API is ready
        // try {
        //     const formData = new FormData();
        //     formData.append("name", newName);
        //     if (newProfilePic) {
        //         formData.append("profilePic", newProfilePic);
        //     }

        //     const response = await API.put("/auth/update-profile", formData, {
        //         headers: {
        //             Authorization: token,
        //             "Content-Type": "multipart/form-data",
        //         },
        //     });

        //     setProfile(response.data.user);
        //     setUpdateSuccess(true);
        //     setTimeout(() => setUpdateSuccess(false), 3000);
        //     setIsEditing(false);
        // } catch (error) {
        //     setUpdateError(true);
        //     setTimeout(() => setUpdateError(false), 3000);
        // }

        // For now, show a success message since the functionality is coming soon
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
        setIsEditing(false);
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            // Reset fields to current values when entering edit mode
            setNewName(profile.name);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
                <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <div className="text-blue-600 text-xl font-semibold">
                        Loading profile...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
                    My Profile
                </h1>

                {updateSuccess && (
                    <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between animate-fadeIn">
                        <span>Profile updated successfully!</span>
                        <button
                            onClick={() => setUpdateSuccess(false)}
                            className="text-green-700 hover:text-green-900"
                        >
                            ×
                        </button>
                    </div>
                )}

                {updateError && (
                    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between animate-fadeIn">
                        <span>Failed to update profile. Please try again.</span>
                        <button
                            onClick={() => setUpdateError(false)}
                            className="text-red-700 hover:text-red-900"
                        >
                            ×
                        </button>
                    </div>
                )}

                {profile ? (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Cover Photo/Header */}
                        <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                            {/* Edit Button */}
                            <button
                                onClick={toggleEdit}
                                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all shadow-md"
                            >
                                <FaPencilAlt />
                            </button>
                        </div>

                        {/* Profile Content */}
                        <div className="px-4 sm:px-8 pb-8 pt-0 -mt-16">
                            {/* Profile Picture */}
                            <div className="relative mx-auto w-32 h-32 mb-4">
                                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                                    <img
                                        src={
                                            previewImage ||
                                            profile.profilePic ||
                                            "https://media.istockphoto.com/id/588348500/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=U7ZWuV1XqwbsejEMF3lIKzUSeSBOex3iiYoicFQUr2A="
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {isEditing && (
                                    <label
                                        htmlFor="profile-pic"
                                        className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-blue-700 transition-colors"
                                    >
                                        <FaCamera />
                                        <input
                                            type="file"
                                            id="profile-pic"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Name */}
                            <div className="text-center mb-6">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                        className="text-center text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none px-2 py-1 w-full max-w-xs mx-auto"
                                    />
                                ) : (
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                        {profile.name}
                                    </h2>
                                )}
                                <p className="text-blue-600 mt-1">
                                    {profile.email}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Profile Details */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                        Profile Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                                <FaUser />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Full Name
                                                </p>
                                                <p className="text-gray-800 font-medium">
                                                    {profile.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                                                <FaEnvelope />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Email Address
                                                </p>
                                                <p className="text-gray-800 font-medium">
                                                    {profile.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                                                <FaUserTag />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Role
                                                </p>
                                                <p className="text-gray-800 font-medium capitalize">
                                                    {profile.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
                                                <FaCalendarAlt />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Member Since
                                                </p>
                                                <p className="text-gray-800 font-medium">
                                                    {new Date(
                                                        profile.createdAt
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Activity or Stats */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                                        Activity Summary
                                    </h3>

                                    {/* Sample Activity Data - Replace with real data when available */}
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-medium text-gray-800">
                                                    Notes Downloaded
                                                </h4>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    12
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: "60%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-medium text-gray-800">
                                                    Notes Uploaded
                                                </h4>
                                                <span className="text-2xl font-bold text-green-600">
                                                    3
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{ width: "15%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-medium text-gray-800">
                                                    Courses Accessed
                                                </h4>
                                                <span className="text-2xl font-bold text-purple-600">
                                                    5
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-purple-600 h-2 rounded-full"
                                                    style={{ width: "25%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-500 transition-all transform hover:scale-105"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={toggleEdit}
                                            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={logout}
                                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg shadow-md hover:from-pink-600 hover:to-red-500 transition-all flex items-center justify-center gap-2"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto mb-4">
                            !
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Profile Not Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            We couldn't load your profile information. Please
                            try again or contact support.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
