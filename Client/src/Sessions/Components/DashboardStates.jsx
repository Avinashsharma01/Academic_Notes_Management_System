/* eslint-disable react/prop-types */

export const DashboardLoading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl ring-1 ring-blue-100 p-8 flex flex-col items-center text-center">
                <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-full border-4 border-blue-100"></div>
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-3 rounded-full bg-blue-50 border border-blue-100"></div>
                </div>

                <div className="text-blue-700 text-2xl font-bold tracking-tight mb-2">
                    Loading Dashboard
                </div>
                <p className="text-gray-500 text-sm mb-4">
                    Fetching sessions, courses, and notes...
                </p>

                <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce"></span>
                </div>
            </div>
        </div>
    );
};

export const DashboardError = ({ error }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-linear-to-br from-blue-50 to-white">
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
