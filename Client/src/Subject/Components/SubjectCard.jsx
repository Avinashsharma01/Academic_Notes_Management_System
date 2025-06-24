/* eslint-disable react/prop-types */

import { FaArrowRight, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    subjectIcons,
    getSubjectColor,
    getSubjectDescription,
} from "../SubjectUtils";

const SubjectCard = ({ subject, semester, branch, course, session }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() =>
                navigate(
                    `/notes?subject=${subject}&semester=${semester}&branch=${branch}&course=${course}&session=${session}`
                )
            }
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
        >
            <div
                className={`bg-gradient-to-r ${getSubjectColor(
                    subject
                )} p-6 flex justify-center items-center text-white`}
            >
                {subjectIcons[subject] || <FaBook size={32} />}
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                    {subject}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {getSubjectDescription(subject)}
                </p>

                <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    View Notes
                    <FaArrowRight className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default SubjectCard;
