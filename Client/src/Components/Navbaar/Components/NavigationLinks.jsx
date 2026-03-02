/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const NavigationLinks = ({ showMenu, setShowMenu, user, admin, superAdmin }) => {
    return (
        <div
            className={`${
                showMenu
                    ? "max-lg:flex max-lg:flex-col max-lg:absolute max-lg:top-16 max-lg:left-0 max-lg:right-0 max-lg:bg-linear-to-b max-lg:from-slate-800 max-lg:to-gray-900 max-lg:p-4 max-lg:shadow-xl max-lg:z-30 max-lg:animate-slideDown"
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

            {(user || admin || superAdmin) && (
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
    );
};

export default NavigationLinks;
