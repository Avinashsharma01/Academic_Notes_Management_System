import React, {useContext} from 'react'
import AuthContext from "../../Context/AuthContext"
const RenderProfileDropdown = () => {
    const { user, logout, admin, Adminlogout } = useContext(AuthContext);
    const [showProfile, setShowProfile] = useState(false);

    const handleProfileMouseEnter = () => {
        clearTimeout(profileTimeout);
        setShowProfile(true);
    };

    const handleProfileMouseLeave = () => {
        profileTimeout = setTimeout(() => setShowProfile(false), 100);
    };
  return (
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
  )
}

export default RenderProfileDropdown