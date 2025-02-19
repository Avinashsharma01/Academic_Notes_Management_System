import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { ImMenu } from "react-icons/im";
const Navbar = () => {
    const { user, logout, admin, Adminlogout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const handleLogout = () => {
        if (admin) {
            Adminlogout();
        } else {
            logout();
        }
    };

    const handleMenuClick = () => {
        if (window.innerWidth <= 600) {
            // max-md screen size
            setShowMenu((prevShowMenu) => !prevShowMenu);
        }
    };

    return (
        <nav className="bg-blue-600 z-10   w-full h-[70px] text-white flex flex-wrap justify-around items-center">
            <ImMenu className="text-3xl md:hidden" onClick={handleMenuClick} />
            <div className="logo">
                <h1 className="text-3xl font-bold">Hellomates</h1>
            </div>
            <div
                className={`navpages gap-3  ${
                    showMenu ? "p-4" : "max-md:hidden"
                }  max-md:absolute top-17 z-10 max-md:bg-blue-600 max-sm:text-sm flex justify-center items-center max-md:w-[100%] flex-wrap max-md:flex-col max-md:gap-5 `}
                onClick={handleMenuClick}
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

                {user || admin ? (
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
                ) : null}
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
            </div>
            {user || admin ? (
                <div>
                    <NavLink
                        onClick={handleLogout}
                        className="px-4 bg-red-500 text-white py-2 rounded-3xl flex justify-center items-center"
                    >
                        Logout
                    </NavLink>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-5">
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-3 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                                : "bg-yellow-500 px-3 rounded-2xl p-1"
                        }
                    >
                        Signup
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-5 text-blue-600 font-bold bg-white p-1 rounded-3xl"
                                : "bg-green-600 px-5 rounded-2xl p-1"
                        }
                    >
                        Login
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
