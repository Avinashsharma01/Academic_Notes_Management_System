/* eslint-disable react/prop-types */

import { FaCalendarAlt, FaGraduationCap, FaBook } from "react-icons/fa";

const DashboardStats = ({ sessions }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    <FaCalendarAlt size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {sessions.length}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4">
                    <FaGraduationCap size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {sessions.reduce(
                            (total, session) => total + session.courses,
                            0
                        )}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                    <FaBook size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Total Notes</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {sessions.reduce(
                            (total, session) => total + session.notes,
                            0
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
