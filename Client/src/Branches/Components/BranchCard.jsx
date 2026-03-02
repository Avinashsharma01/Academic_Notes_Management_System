/* eslint-disable react/prop-types */

import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    getBranchIcon,
    getBranchColor,
    getBranchDescription,
} from "../utils/branchUtils";

const BranchCard = ({ branch, course, session }) => {
    const navigate = useNavigate();

    const buildSemesterUrl = () => {
        const params = new URLSearchParams({
            branch: branch.route,
            course,
            session,
            branchId: branch._id,
        });

        if (branch.courseId) {
            params.set("courseId", branch.courseId);
        }

        return `/semester?${params.toString()}`;
    };

    return (
        <div
            onClick={() => navigate(buildSemesterUrl())}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
        >
            <div
                className={`bg-linear-to-r ${getBranchColor(
                    branch.route
                )} p-6 flex justify-center items-center text-white`}
            >
                {getBranchIcon(branch.route)}
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {branch.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                    {getBranchDescription(branch.route)}
                </p>

                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Explore Semesters
                    <FaArrowRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default BranchCard;
