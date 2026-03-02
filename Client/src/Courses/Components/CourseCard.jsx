/* eslint-disable react/prop-types */
import {
    FaArrowRight,
    FaGraduationCap,
    FaBook,
    FaFlask,
    FaMicroscope,
    FaBriefcase,
    FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, session }) => {
    const navigate = useNavigate();

    const buildBranchUrl = () => {
        const params = new URLSearchParams({
            course: course.route,
            session,
            courseId: course.id,
        });
        return `/branch?${params.toString()}`;
    };

    const renderIcon = (iconName) => {
        switch (iconName) {
            case "graduation-cap":
                return <FaGraduationCap className="text-3xl" />;
            case "book":
                return <FaBook className="text-3xl" />;
            case "flask":
                return <FaFlask className="text-3xl" />;
            case "microscope":
                return <FaMicroscope className="text-3xl" />;
            case "briefcase":
                return <FaBriefcase className="text-3xl" />;
            case "chart-line":
                return <FaChartLine className="text-3xl" />;
            default:
                return <FaGraduationCap className="text-3xl" />;
        }
    };

    const getBgColorClass = (color) => {
        switch (color) {
            case "blue":
                return "from-blue-500 to-blue-600";
            case "indigo":
                return "from-indigo-500 to-indigo-600";
            case "green":
                return "from-green-500 to-green-600";
            case "teal":
                return "from-teal-500 to-teal-600";
            case "yellow":
                return "from-yellow-500 to-yellow-600";
            case "orange":
                return "from-orange-500 to-orange-600";
            default:
                return "from-blue-500 to-blue-600";
        }
    };

    return (
        <div
            onClick={() => navigate(buildBranchUrl())}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
        >
            {" "}
            <div
                className={`bg-linear-to-r p-6 flex justify-center items-center text-white ${getBgColorClass(
                    course.color
                )}`}
            >
                {renderIcon(course.icon)}
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {course.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                    {course.description}
                </p>{" "}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{course.departments} Departments</span>
                    <span>{course.students} Students</span>
                </div>
                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Explore Branches
                    <FaArrowRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
