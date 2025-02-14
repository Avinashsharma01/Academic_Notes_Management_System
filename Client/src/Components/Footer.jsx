import { NavLink } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaGithub,
} from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 ">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    {/* Left - Branding */}
                    <div>
                        <h5 className="text-xl font-semibold">Hellomates</h5>
                        <p className="text-gray-400">
                            Building the future, one step at a time.
                        </p>
                    </div>

                    {/* Middle - Quick Links */}
                    <div>
                        <h5 className="text-xl font-semibold">Quick Links</h5>
                        <ul className="mt-2 space-y-2">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "active-class px-3 text-red-500 p-1 rounded-3xl"
                                        : "px-3"
                                }
                            >
                                <li>Home</li>
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive
                                        ? "active-class px-3 text-red-500 p-1 rounded-3xl"
                                        : "px-3"
                                }
                            >
                                <li>About</li>
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className={({ isActive }) =>
                                    isActive
                                        ? "active-class px-3 text-red-500 p-1 rounded-3xl"
                                        : "px-3"
                                }
                            >
                                <li>Contact</li>
                            </NavLink>
                            <NavLink
                                to="/service"
                                className={({ isActive }) =>
                                    isActive
                                        ? "active-class px-3 text-red-500 p-1 rounded-3xl"
                                        : "px-3"
                                }
                            >
                                <li>Service</li>
                            </NavLink>
                            <NavLink
                                to="/feedback"
                                className={({ isActive }) =>
                                    isActive
                                        ? "active-class px-3 text-red-500 p-1 rounded-3xl"
                                        : "px-3"
                                }
                            >
                                <li>Feedback</li>
                            </NavLink>
                        </ul>
                    </div>

                    {/* Right - Social Media */}
                    <div>
                        <h5 className="text-xl font-semibold">Follow Us</h5>
                        <div className="flex justify-center md:justify-start space-x-4 mt-2">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                <FaYoutube />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white text-lg"
                            >
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
                    © {new Date().getFullYear()} Hellomates. All Rights
                    Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
