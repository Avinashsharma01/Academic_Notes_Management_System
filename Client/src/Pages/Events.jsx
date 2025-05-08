/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaTicketAlt,
} from "react-icons/fa";

const Events = ({ event }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden relative flex flex-col justify-center items-center p-6">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 bg-blue-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 bg-indigo-500/10 h-64 w-64 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 bg-purple-500/10 h-32 w-32 rounded-full blur-2xl"></div>

            <div className="max-w-2xl w-full bg-slate-700/50 backdrop-blur-sm border border-slate-600 shadow-2xl rounded-xl overflow-hidden z-10 transition-all hover:shadow-blue-500/20">
                {/* Event Image */}
                <div className="h-56 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,0 L100,0 L100,100 L0,100 Z"
                                fill="url(#grid)"
                            />
                        </svg>
                        <defs>
                            <pattern
                                id="grid"
                                width="10"
                                height="10"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 10 0 L 0 0 0 10"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="0.5"
                                />
                            </pattern>
                        </defs>
                    </div>
                    <div className="z-10 flex flex-col items-center">
                        <span className="text-5xl font-bold text-white bg-blue-500/60 backdrop-blur-sm h-24 w-24 rounded-full flex items-center justify-center shadow-lg mb-2">
                            {event.title.charAt(0)}
                        </span>
                        <span className="text-white text-sm font-semibold px-4 py-1 bg-blue-600/70 backdrop-blur-sm rounded-full">
                            {event.category || "Workshop"}
                        </span>
                    </div>
                </div>

                {/* Event Content */}
                <div className="p-8">
                    {/* Event Title */}
                    <h1 className="text-3xl font-bold text-blue-400 mb-6">
                        {event.title}
                    </h1>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-3 text-gray-300">
                            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <FaCalendarAlt className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">
                                    Date
                                </div>
                                <div>{event.date}</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-300">
                            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <FaClock className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">
                                    Time
                                </div>
                                <div>{event.time}</div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-3 text-gray-300 mb-6">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <FaMapMarkerAlt className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">
                                Location
                            </div>
                            <div>{event.location}</div>
                        </div>
                    </div>

                    {/* Event Description */}
                    <div className="bg-slate-600/50 backdrop-blur-sm border border-slate-500 rounded-lg p-4 mb-8">
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">
                            About This Event
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    {/* Register Button */}
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/50">
                        <FaTicketAlt className="h-5 w-5" />
                        <span className="font-semibold">Register Now</span>
                    </button>

                    {/* Additional information */}
                    {event.speakers && (
                        <div className="mt-6 pt-6 border-t border-slate-600">
                            <h3 className="text-lg font-semibold text-blue-300 mb-3">
                                Featured Speakers
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {event.speakers.map((speaker, index) => (
                                    <div
                                        key={index}
                                        className="px-3 py-1 bg-slate-600 rounded-full text-sm text-gray-300"
                                    >
                                        {speaker}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Footer */}
            <div className="text-center pt-8 border-t border-slate-600/50">
                <p className="text-gray-400">
                    © {new Date().getFullYear()} The College Notes Hub. All
                    rights reserved.
                </p>
                <p>
                    Designed and developed with ❤️ to support educational
                    excellence.
                </p>
            </div>
        </div>
    );
};

export default Events;
