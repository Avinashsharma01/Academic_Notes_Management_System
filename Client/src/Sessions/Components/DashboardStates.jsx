/* eslint-disable react/prop-types */

export const DashboardLoading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="p-8 rounded-lg bg-white shadow-lg flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-blue-600 text-xl font-semibold">
                    Loading sessions...
                </div>
            </div>
        </div>
    );
};

export const DashboardError = ({ error }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="p-8 rounded-lg bg-white shadow-lg text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto mb-4">
                    !
                </div>
                <div className="text-red-500 text-xl font-semibold mb-2">
                    Error
                </div>
                <p className="text-gray-600">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};
