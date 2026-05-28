/* eslint-disable react/prop-types */

import { FaSearch, FaFilter, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotesSearchFilter = ({
    searchQuery,
    handleSearchChange,
    isAdminView,
    admin,
    showOnlyMyUploads,
    setShowOnlyMyUploads,
    branch,
    course,
    session,
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-2/3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search notes by title, description or subject..."
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Admin filter toggle */}
                {isAdminView && admin && (
                    <div className="w-full md:w-auto">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={showOnlyMyUploads}
                                onChange={() =>
                                    setShowOnlyMyUploads(!showOnlyMyUploads)
                                }
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900">
                                Show Only My Uploads
                            </span>
                        </label>
                    </div>
                )}

                <div className="w-full md:w-auto flex justify-between md:justify-end gap-3 flex-wrap">
                    <button
                        onClick={() =>
                            navigate(
                                `/semester?branch=${branch}&course=${course}&session=${session}`
                            )
                        }
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <FaFilter className="text-gray-600" />
                        Change Filters
                    </button>
                    {admin && (
                        <button
                            onClick={() => navigate("/notes/upload")}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center gap-2 transition-colors hover:from-green-600 hover:to-green-700 shadow-md"
                        >
                            <FaBook />
                            Upload Notes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesSearchFilter;
