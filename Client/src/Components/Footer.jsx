import { NavLink } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    // FaGithub,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                {/* Top Footer Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* About Us */}
                    <div>
                        <h4 className="text-2xl font-bold mb-5 relative inline-block">
                            Hellomates
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
                        </h4>
                        <p className="text-gray-300 mb-5 leading-relaxed">
                            Building the future of education through innovative
                            note sharing. We connect students with the resources
                            they need to succeed.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a
                                href="#"
                                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                            >
                                <FaFacebook className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                            >
                                <FaTwitter className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                            >
                                <FaInstagram className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                            >
                                <FaYoutube className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-2xl font-bold mb-5 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-green-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    to="/"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/notes"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Notes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/feedback"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Feedback
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-2xl font-bold mb-5 relative inline-block">
                            Resources
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    to="/branch"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Branches
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/courses"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Courses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/subjects"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Subjects
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/faq"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    FAQ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/privacy-policy"
                                    className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Privacy Policy
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-2xl font-bold mb-5 relative inline-block">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                                <span className="text-gray-300">
                                    Meerut Uttar Pradesh, India
                                </span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="text-blue-500 mr-3" />
                                <span className="text-gray-300">
                                    +91 6201693634
                                </span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="text-blue-500 mr-3" />
                                <span className="text-gray-300">
                                    Avinashsharma31384@gmail.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="py-8 border-t border-b border-gray-800 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h4 className="text-xl font-bold mb-2">
                                Subscribe to our Newsletter
                            </h4>
                            <p className="text-gray-400">
                                Stay updated with the latest notes and
                                educational resources
                            </p>
                        </div>
                        <div>
                            <form className="flex flex-col sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-gray-800 text-white px-4 py-3 rounded-l-md focus:outline-none w-full sm:w-2/3"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-md transition-colors font-medium mt-2 sm:mt-0"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center text-gray-400">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p>
                            © {new Date().getFullYear()} Hellomates. All Rights
                            Reserved.
                        </p>
                        <div className="flex space-x-4 mt-3 md:mt-0">
                            <NavLink
                                to="/terms"
                                className="hover:text-white transition-colors"
                            >
                                Terms of Service
                            </NavLink>
                            <NavLink
                                to="/privacy"
                                className="hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </NavLink>
                            <NavLink
                                to="/support"
                                className="hover:text-white transition-colors"
                            >
                                Support
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
