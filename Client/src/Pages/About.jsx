/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import {
    FaGraduationCap,
    FaCloudUploadAlt,
    FaSearch,
    FaUserShield,
    FaUsers,
    FaFolderOpen,
} from "react-icons/fa";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

            {/* Header Section */}
            <div className="relative z-10 pt-20 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="mx-auto h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                        <FaGraduationCap className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-blue-400 mb-4">
                        The College Notes Hub
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        An innovative platform built to streamline the
                        management and distribution of educational resources for
                        students and educators
                    </p>
                </div>

                {/* Vision and Mission */}
                <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-slate-600 mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold text-blue-400 mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-300">
                                To create an accessible, efficient platform
                                where academic resources are easily shared,
                                organized, and utilized, empowering students to
                                excel in their educational journey. We believe
                                in breaking down barriers to education through
                                technology.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-blue-400 mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-300">
                                We're committed to providing a centralized,
                                user-friendly system for academic notes
                                management. Our platform facilitates the upload,
                                search, and access of educational materials
                                across various courses, semesters, and subjects,
                                enhancing the learning experience for all.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <h2 className="text-3xl font-bold text-center text-blue-400 mb-10">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg">
                        <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                            <FaCloudUploadAlt className="h-7 w-7 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-300 mb-2">
                            Note Management
                        </h3>
                        <p className="text-gray-300">
                            Our system allows administrators to upload, update,
                            and organize educational notes across various
                            courses, branches, semesters, and subjects.
                        </p>
                    </div>

                    <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg">
                        <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                            <FaSearch className="h-7 w-7 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-300 mb-2">
                            Advanced Search
                        </h3>
                        <p className="text-gray-300">
                            Students can easily find relevant materials using
                            our comprehensive search and filter functionality,
                            making resource discovery efficient and
                            straightforward.
                        </p>
                    </div>

                    <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg">
                        <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                            <FaUserShield className="h-7 w-7 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-300 mb-2">
                            Secure Access
                        </h3>
                        <p className="text-gray-300">
                            Our platform implements robust authentication and
                            authorization mechanisms to ensure that content is
                            accessible only to verified users and
                            administrators.
                        </p>
                    </div>
                </div>

                {/* Technical Stack */}
                <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-slate-600 mb-16">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
                        Our Technology Stack
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4">
                            <div className="text-5xl font-bold text-blue-300 mb-2">
                                <i className="fab fa-react"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-200">
                                React
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Frontend Framework
                            </p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-5xl font-bold text-blue-300 mb-2">
                                <i className="fab fa-node-js"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-200">
                                Node.js
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Backend Runtime
                            </p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-5xl font-bold text-blue-300 mb-2">
                                <i className="fas fa-server"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-200">
                                Express
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Web Framework
                            </p>
                        </div>
                        <div className="text-center p-4">
                            <div className="text-5xl font-bold text-blue-300 mb-2">
                                <i className="fas fa-database"></i>
                            </div>
                            <h3 className="text-lg font-medium text-gray-200">
                                MongoDB
                            </h3>
                            <p className="text-gray-400 text-sm">Database</p>
                        </div>
                    </div>
                </div>

                {/* User Roles */}
                <h2 className="text-3xl font-bold text-center text-blue-400 mb-10">
                    Who Uses Our Platform
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                        <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                                <FaUsers className="h-6 w-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-300">
                                Students
                            </h3>
                        </div>
                        <p className="text-gray-300">
                            Students from various courses and semesters can
                            access relevant study materials, search for notes by
                            specific criteria, and download resources to enhance
                            their learning experience.
                        </p>
                    </div>

                    <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                        <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                                <FaFolderOpen className="h-6 w-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-blue-300">
                                Administrators
                            </h3>
                        </div>
                        <p className="text-gray-300">
                            Faculty and staff can manage educational content,
                            upload new materials, organize resources by academic
                            parameters, and ensure quality control of the
                            available study materials.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-600/50">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} The College Notes Hub. All
                        rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Designed and developed with ❤️ to support educational
                        excellence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
