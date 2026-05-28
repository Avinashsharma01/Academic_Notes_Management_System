/* eslint-disable react/prop-types */
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmptyNotesList = ({
    searchQuery,
    setSearchQuery,
    branch,
    course,
    session,
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4">
                <FaBook size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Notes Found
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchQuery
                    ? "No notes match your search criteria. Try adjusting your search terms."
                    : "There are no notes available for the selected criteria yet."}
            </p>
            {searchQuery ? (
                <button
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Clear Search
                </button>
            ) : (
                <button
                    onClick={() =>
                        navigate(
                            `/semester?branch=${branch}&course=${course}&session=${session}`
                        )
                    }
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Change Selection
                </button>
            )}
        </div>
    );
};

export default EmptyNotesList;
