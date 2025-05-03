import { useEffect } from "react";
import {
    FaSearch,
    FaCloudUploadAlt,
    FaDownload,
    FaMobileAlt,
    FaUserShield,
    FaFilter,
} from "react-icons/fa";

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

            <div className="relative z-10 pt-20 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-blue-400 mb-4">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Empowering education through innovative notes management
                        solutions
                    </p>
                </div>

                {/* Main Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-600 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
                        <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <FaCloudUploadAlt className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-3">
                            Note Upload System
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Our platform provides administrators with an
                            intuitive interface to upload educational materials.
                            Easily categorize notes by session, course, branch,
                            semester, and subject for better organization.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Support for multiple file formats (PDF, DOCX,
                                PPTX)
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Secure cloud storage using Cloudinary
                                integration
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Efficient metadata management for better
                                searchability
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-600 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
                        <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <FaSearch className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-3">
                            Advanced Search
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Find precisely what you need with our powerful
                            search functionality. Filter notes based on multiple
                            parameters to quickly locate relevant educational
                            resources.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Multi-parameter filtering by course, semester,
                                subject
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Full-text search capabilities across note titles
                                and descriptions
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Real-time search results with smart sorting
                                options
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-600 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
                        <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <FaDownload className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-3">
                            Easy Downloads
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Access and download educational materials with just
                            a few clicks. Our streamlined download process
                            ensures students can quickly obtain the resources
                            they need for their studies.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Direct downloads with no unnecessary redirects
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Optimized file compression for faster downloads
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Download history tracking for registered users
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-600 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
                        <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <FaUserShield className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-3">
                            Secure Authentication
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Our platform features robust user authentication and
                            authorization systems to ensure that educational
                            content is accessible only to registered users and
                            administrators.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                JWT-based secure authentication
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Role-based access control (Student vs Admin)
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                Email verification for new account registration
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Additional Services */}
                <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
                    Additional Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="flex bg-slate-700/30 p-6 rounded-lg border border-slate-600 hover:bg-slate-700/40 transition-all duration-300">
                        <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                            <FaFilter className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-300 mb-2">
                                Smart Filtering
                            </h3>
                            <p className="text-gray-300">
                                Intelligent filtering system that adapts based
                                on your course and semester selections, showing
                                only relevant subjects and materials.
                            </p>
                        </div>
                    </div>

                    <div className="flex bg-slate-700/30 p-6 rounded-lg border border-slate-600 hover:bg-slate-700/40 transition-all duration-300">
                        <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                            <FaMobileAlt className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-300 mb-2">
                                Mobile Responsiveness
                            </h3>
                            <p className="text-gray-300">
                                Access your educational materials on any device
                                with our fully responsive design optimized for
                                desktop, tablet, and mobile experiences.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 rounded-lg shadow-xl border border-blue-500/30 text-center mt-8 mb-8">
                    <h2 className="text-2xl font-bold text-blue-300 mb-4">
                        Ready to Enhance Your Learning Experience?
                    </h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Join thousands of students already using our platform to
                        access quality educational materials and improve their
                        academic performance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/register"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            Register Now
                        </a>
                        <a
                            href="/notes"
                            className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            Browse Notes
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-600/50">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} The College Notes Hub. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;
