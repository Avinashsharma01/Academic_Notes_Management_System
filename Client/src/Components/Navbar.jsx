import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Navbar = () => {
    const { user, logout, admin, Adminlogout } = useContext(AuthContext);

    const handleLogout = () => {
        if (admin) {
            Adminlogout();
        } else {
            logout();
        }
    };

    return (
        <nav className="bg-blue-600 p-4 w-full h-[70px] text-white flex justify-around items-center">
            <div className="logo">
                <h1 className="text-xl font-bold">Hellomates</h1>
            </div>
            <div className="navpages">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                            : "px-3"
                    }
                >
                    Home
                </NavLink>

                {user || admin ? (
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                                : "px-3"
                        }
                    >
                        Dashboard
                    </NavLink>
                ) : null}
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                            : "px-3"
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                            : "px-3"
                    }
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/service"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                            : "px-3"
                    }
                >
                    Services
                </NavLink>
                <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                        isActive
                            ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                            : "px-3"
                    }
                >
                    Feedback
                </NavLink>
            </div>
            {user || admin ? (
                <div>
                    <NavLink onClick={handleLogout} className="px-3">
                        Logout
                    </NavLink>
                </div>
            ) : (
                <div>
                    <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                                : "px-3"
                        }
                    >
                        Signup
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "active-class px-3 text-red-500 bg-white p-1 rounded-3xl"
                                : "px-3"
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
