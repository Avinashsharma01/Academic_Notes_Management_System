/* eslint-disable react/prop-types */

import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmptySemesterList = ({ course, session }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl mx-auto mb-4">
                <FaBook size={28} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Semesters Available
            </h2>
            <p className="text-gray-600 mb-6">
                There are no semesters available for this branch yet.
            </p>
            <button
                onClick={() =>
                    navigate(`/branch?course=${course}&session=${session}`)
                }
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
                Back to Branches
            </button>
        </div>
    );
};

export default EmptySemesterList;
