/* eslint-disable react/prop-types */

import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BranchDetails = ({ branch, course, session }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Branch Details
                    </h2>
                    <p className="text-gray-600">
                        Viewing semesters for{" "}
                        <span className="font-semibold text-blue-600">
                            {branch.toUpperCase()}
                        </span>{" "}
                        in{" "}
                        <span className="font-semibold text-blue-600">
                            {course.toUpperCase()}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() =>
                        navigate(`/branch?course=${course}&session=${session}`)
                    }
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                >
                    Change Branch
                    <FaArrowRight className="text-sm" />
                </button>
            </div>
        </div>
    );
};

export default BranchDetails;
