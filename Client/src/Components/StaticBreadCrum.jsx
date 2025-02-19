import { NavLink } from "react-router-dom";

const StaticBreadCrum = () => {
    return (
        <nav className="flex items-center text-sm text-gray-400 mb-6">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-gray-400"
                }
            >
                Home
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-gray-400"
                }
            >
                Dashboard
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink
                to="/courses"
                className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-gray-400"
                }
            >
                Courses
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink
                to="/branch"
                className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-gray-400"
                }
            >
                Branch
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink
                to="/semester"
                className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-gray-400"
                }
            >
                Semester
            </NavLink>
            <span className="mx-2">/</span>
            <NavLink
                to="/subjects"
                className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-gray-400"
                }
            >
                Subjects
            </NavLink>
            <span className="mx-2">/</span>
            <span className="text-white">Notes</span>
        </nav>
    );
};

export default StaticBreadCrum;
