/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Helper function to get a color for a specific semester
const getSemesterColor = (index) => {
    const colors = [
        "from-blue-500 to-blue-600",
        "from-purple-500 to-purple-600",
        "from-green-500 to-green-600",
        "from-red-500 to-red-600",
        "from-yellow-500 to-yellow-600",
        "from-indigo-500 to-indigo-600",
        "from-pink-500 to-pink-600",
        "from-teal-500 to-teal-600",
    ];
    return colors[index % colors.length];
};

const SemesterCard = ({
    semester,
    branch,
    branchId,
    course,
    session,
    courseId,
    index,
}) => {
    const navigate = useNavigate();

    const buildSubjectsUrl = () => {
        const params = new URLSearchParams({
            semester: semester.route,
            branch,
            course,
            session,
            semesterId: semester._id,
        });

        if (branchId) {
            params.set("branchId", branchId);
        }

        if (courseId) {
            params.set("courseId", courseId);
        }

        return `/subjects?${params.toString()}`;
    };

    return (
        <div
            onClick={() => navigate(buildSubjectsUrl())}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
        >
            <div
                className={`bg-gradient-to-r ${getSemesterColor(
                    index
                )} p-6 flex justify-center items-center text-white`}
            >
                <FaCalendarAlt size={36} />
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {semester.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {semester.description}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{semester.subjects} Subjects</span>
                    <span>{semester.route} Term</span>
                </div>

                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Explore Subjects
                    <FaArrowRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default SemesterCard;
