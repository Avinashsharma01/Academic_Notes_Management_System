/* eslint-disable react/prop-types */
import {
    FaGraduationCap,
    FaBook,
    FaCalendarAlt,
    FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Helper functions for styling the session cards
const getColorForYear = (year) => {
    const colors = [
        "bg-blue-600",
        "bg-purple-600",
        "bg-green-600",
        "bg-red-600",
        "bg-yellow-600",
        "bg-indigo-600",
        "bg-pink-600",
        "bg-teal-600",
        "bg-orange-600",
    ];
    return colors[year % colors.length];
};

const getYearStatus = (year) => {
    const currentYear = new Date().getFullYear();

    if (year < currentYear) {
        return "Completed";
    } else if (year === currentYear) {
        return "Current";
    } else {
        return "Upcoming";
    }
};

const getYearStatusBadge = (year) => {
    const status = getYearStatus(year);

    if (status === "Completed") {
        return "bg-green-100 text-green-800";
    } else if (status === "Current") {
        return "bg-blue-100 text-blue-800";
    } else {
        return "bg-gray-100 text-gray-800";
    }
};

const SessionCard = ({ session }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
            <div className={`h-3 ${getColorForYear(session.year)}`}></div>
            <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {session.year}
                    </h2>
                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getYearStatusBadge(
                            session.year
                        )}`}
                    >
                        {getYearStatus(session.year)}
                    </span>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-purple-500 mr-3 shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">
                            <span className="font-medium">
                                {session.courses}
                            </span>{" "}
                            Courses Available
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaBook className="text-green-500 mr-3 shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">
                            <span className="font-medium">{session.notes}</span>{" "}
                            Notes Uploaded
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-3 shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">
                            <span className="font-medium">
                                {session.startYear} - {session.endYear}
                            </span>
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => navigate(`/courses?session=${session.year}`)}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                    Explore Courses
                    <FaChevronRight className="ml-2" size={14} />
                </button>
            </div>
        </div>
    );
};

export default SessionCard;
