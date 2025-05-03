/* eslint-disable react/prop-types */

import { useEffect } from "react";

const Events = ({ event }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        //  bg-gradient-to-br from-blue-50 to-purple-50
        <div className="min-h-screen bg-[#1E2A38] flex justify-center items-center p-6">
            <div className="max-w-2xl w-full bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-3xl">
                {/* Event Image */}
                <div className="h-48 bg-blue-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white bg-blue-600 p-4 rounded-full">
                        {event.title.charAt(0)}
                    </span>
                </div>

                {/* Event Content */}
                <div className="p-8">
                    {/* Event Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {event.title}
                    </h1>

                    {/* Date & Time */}
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                        <span className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{event.date}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{event.time}</span>
                        </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-gray-700 mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{event.location}</span>
                    </div>

                    {/* Event Description */}
                    <p className="text-gray-600 leading-relaxed mb-8">
                        {event.description}
                    </p>

                    {/* Register Button */}
                    <button className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Events;
