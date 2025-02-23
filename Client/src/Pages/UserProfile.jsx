/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import API from "../Api/axiosInstance";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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
        //     alert("Profile updated successfully!");
        // } catch (error) {
        //     alert("Failed to update profile.");
        // }
        alert("This functionality come very soon.....");
    };

    if (loading) return <p className="text-white text-center">Loading...</p>;

    return (
        <div className="p-10 bg-gray-800 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-5">
                👤 User Profile
            </h1>

            {profile ? (
                <div className="bg-gray-700 p-5 rounded-lg shadow-lg max-w-md mx-auto">
                    {/* Profile Picture */}
                    <div className="flex justify-center">
                        <img
                            src={
                                previewImage ||
                                "https://media.istockphoto.com/id/588348500/vector/male-avatar-profile-picture-vector.jpg?s=170667a&w=0&k=20&c=U7ZWuV1XqwbsejEMF3lIKzUSeSBOex3iiYoicFQUr2A="
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-2 border-white"
                        />
                    </div>

                    <p className="text-lg mt-3">
                        <strong>Name:</strong> {profile.name}
                    </p>
                    <p className="text-lg">
                        <strong>Email:</strong> {profile.email}
                    </p>
                    <p className="text-lg">
                        <strong>Role:</strong> {profile.role}
                    </p>
                    <p className="text-lg">
                        <strong>Joined:</strong>{" "}
                        {new Date(profile.createdAt).toLocaleDateString()}
                    </p>

                    {/* Update Name & Profile Picture */}
                    <div className="mt-4">
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="p-2 w-full text-black rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-2 p-2 w-full bg-white text-black rounded"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white p-2 w-full mt-2 rounded"
                        >
                            Update Profile
                        </button>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white p-2 w-full mt-5 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-400">
                    Failed to load profile.
                </p>
            )}
        </div>
    );
};

export default Profile;

// /* eslint-disable no-unused-vars */
// import { useContext, useEffect, useState } from "react";
// import AuthContext from "../Context/AuthContext";
// import API from "../Api/axiosInstance";

// const Profile = () => {
//     const { user, logout } = useContext(AuthContext);
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [newName, setNewName] = useState("");

//     const token = localStorage.getItem("authToken");
//     // Fetch user details
//     useEffect(() => {
//         if (!token) return;
//         API.get("/auth/me", {
//             headers: { Authorization: token },
//         })
//             .then((res) => {
//                 setProfile(res.data.user);
//                 setNewName(res.data.user.name);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 setLoading(false);
//             });
//     }, [token]);

//     // Handle name update
//     const handleUpdate = async () => {
//         try {
//             const response = await API.put(
//                 "/auth/update-profile",
//                 { name: newName },
//                 {
//                     headers: { Authorization: token },
//                 }
//             );
//             setProfile(response.data.user);
//             alert("Profile updated successfully!");
//         } catch (error) {
//             alert("Failed to update profile.");
//         }
//     };

//     if (loading) return <p className="text-white text-center">Loading...</p>;

//     return (
//         <div className="p-10 bg-gray-800 text-white min-h-screen">
//             <h1 className="text-3xl font-bold text-center mb-5">
//                 👤 User Profile
//             </h1>

//             {profile ? (
//                 <div className="bg-gray-700 p-5 rounded-lg shadow-lg max-w-md mx-auto">
//                     <p className="text-lg">
//                         <strong>Name:</strong> {profile.name}
//                     </p>
//                     <p className="text-lg">
//                         <strong>Email:</strong> {profile.email}
//                     </p>
//                     <p className="text-lg">
//                         <strong>Role:</strong> {profile.role}
//                     </p>
//                     <p className="text-lg">
//                         <strong>Joined:</strong>{" "}
//                         {new Date(profile.createdAt).toLocaleDateString()}
//                     </p>

//                     {/* Update Name */}
//                     <div className="mt-4">
//                         <input
//                             type="text"
//                             value={newName}
//                             onChange={(e) => setNewName(e.target.value)}
//                             className="p-2 w-full text-black rounded"
//                         />
//                         <button
//                             onClick={handleUpdate}
//                             className="bg-blue-500 text-white p-2 w-full mt-2 rounded"
//                         >
//                             Update Name
//                         </button>
//                     </div>

//                     {/* Logout Button */}
//                     <button
//                         onClick={logout}
//                         className="bg-red-500 text-white p-2 w-full mt-5 rounded"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-400">
//                     Failed to load profile.
//                 </p>
//             )}
//         </div>
//     );
// };

// export default Profile;
