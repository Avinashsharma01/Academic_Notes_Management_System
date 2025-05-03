import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft, FaHome } from "react-icons/fa";
import { useEffect } from "react";
const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden relative flex flex-col items-center justify-center p-6">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

            <div className="relative z-10 max-w-2xl w-full text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                    <FaExclamationTriangle className="h-12 w-12 text-red-400" />
                </div>

                <h1 className="text-6xl font-bold text-blue-400 mb-2">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Page Not Found
                </h2>

                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-lg p-6 mb-8 shadow-xl">
                    <p className="text-gray-300 mb-4">
                        Oops! The page you are looking for might have been
                        removed, had its name changed, or is temporarily
                        unavailable.
                    </p>

                    <div className="w-3/4 mx-auto border-t border-slate-600 my-4"></div>

                    <p className="text-gray-400 text-sm">
                        Error Code: 404 | Route Not Found
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg shadow-blue-500/20"
                    >
                        <FaHome className="mr-2" />
                        Return to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                        <FaArrowLeft className="mr-2" />
                        Go Back
                    </button>
                </div>
            </div>

            {/* Animated elements */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-30">
                <div className="text-9xl font-bold text-blue-500/10">4</div>
            </div>
            <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 opacity-30">
                <div className="text-9xl font-bold text-blue-500/10">4</div>
            </div>
        </div>
    );
};

export default NotFound;
