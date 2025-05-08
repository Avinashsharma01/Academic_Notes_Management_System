/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaUserCircle,
    FaPaperPlane,
} from "react-icons/fa";
import API from "../Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/contact/submit", formData);
            toast.success(
                "Message sent successfully! We'll get back to you soon."
            );
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(
                error.response?.data?.message ||
                    "Failed to send message. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden relative">
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

            <div className="relative z-10 pt-20 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-blue-400 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Have questions or feedback? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
                    {/* Contact Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-600 h-full">
                            <h2 className="text-2xl font-bold text-blue-400 mb-6">
                                Get In Touch
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                                        <FaEnvelope className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-300">
                                            Email
                                        </h3>
                                        <p className="text-gray-300">
                                            support@collegenoteshub.com
                                        </p>
                                        <p className="text-gray-300">
                                            info@collegenoteshub.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                                        <FaPhone className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-300">
                                            Phone
                                        </h3>
                                        <p className="text-gray-300">
                                            +1 (555) 123-4567
                                        </p>
                                        <p className="text-gray-300">
                                            +1 (555) 987-6543
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                                        <FaMapMarkerAlt className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-300">
                                            Address
                                        </h3>
                                        <p className="text-gray-300">
                                            College Notes Hub Campus
                                            <br />
                                            123 Education Avenue
                                            <br />
                                            Learning District, ED 12345
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-600">
                                <h3 className="text-lg font-semibold text-blue-300 mb-4">
                                    Connect With Us
                                </h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                                    >
                                        <i className="fab fa-facebook-f text-white"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                                    >
                                        <i className="fab fa-twitter text-white"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                                    >
                                        <i className="fab fa-linkedin-in text-white"></i>
                                    </a>
                                    <a
                                        href="#"
                                        className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                                    >
                                        <i className="fab fa-instagram text-white"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-600">
                            <h2 className="text-2xl font-bold text-blue-400 mb-6">
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUserCircle className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    >
                                        <option value="">
                                            Select a subject
                                        </option>
                                        <option value="General Inquiry">
                                            General Inquiry
                                        </option>
                                        <option value="Technical Support">
                                            Technical Support
                                        </option>
                                        <option value="Notes Request">
                                            Notes Request
                                        </option>
                                        <option value="Feedback">
                                            Feedback
                                        </option>
                                        <option value="Report Issue">
                                            Report Issue
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full p-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                            loading
                                                ? "bg-blue-700 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/20"
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="h-5 w-5 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-slate-700/50 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-slate-600 mb-16 overflow-hidden">
                    <div className="aspect-video relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.0568449647822!2d-74.0059!3d40.7127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzQ1LjgiTiA3NMKwMDAnMjEuMiJX!5e0!3m2!1sen!2sus!4v1620389845739!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            className="absolute inset-0"
                        ></iframe>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-blue-400 mb-10">
                        Frequently Asked Questions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                            <h3 className="text-xl font-semibold text-blue-300 mb-3">
                                How can I request specific notes?
                            </h3>
                            <p className="text-gray-300">
                                If you're looking for specific notes that aren't
                                available on our platform, you can use the
                                contact form above with the subject "Notes
                                Request" to submit your request to our team.
                            </p>
                        </div>

                        <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                            <h3 className="text-xl font-semibold text-blue-300 mb-3">
                                What file formats do you support?
                            </h3>
                            <p className="text-gray-300">
                                Our platform supports multiple file formats
                                including PDF, DOCX, PPTX, and more. If you have
                                specific format requirements, feel free to
                                contact our support team.
                            </p>
                        </div>

                        <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                            <h3 className="text-xl font-semibold text-blue-300 mb-3">
                                How quickly will I get a response?
                            </h3>
                            <p className="text-gray-300">
                                We strive to respond to all inquiries within
                                24-48 hours during business days. Technical
                                support and urgent matters are prioritized for
                                faster response times.
                            </p>
                        </div>

                        <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                            <h3 className="text-xl font-semibold text-blue-300 mb-3">
                                Can I contribute my own notes?
                            </h3>
                            <p className="text-gray-300">
                                Yes! We welcome quality contributions from
                                students and educators. Please contact us to
                                learn more about our verification process and
                                how to become a contributor.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-600/50">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} The College Notes Hub. All
                        rights reserved.
                    </p>
                    <p className="text-gray-400">
                        Designed and developed with ❤️ to support educational
                        excellence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
