/* eslint-disable react/prop-types */

export const SemesterLoading = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
            <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-blue-600 text-xl font-semibold">
                    Loading semesters...
                </div>
            </div>
        </div>
    );
};

export const SemesterError = ({ error }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex justify-center items-center">
            <div className="p-8 rounded-lg bg-white shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto mb-4">
                    !
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Error
                </h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};
