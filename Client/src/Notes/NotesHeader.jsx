// filepath: c:\Desktop\The College\Client\src\Notes\NotesHeader.jsx
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotesHeader = ({ subject, branch, course, semester, session }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-linear-to-r from-blue-600 to-indigo-800 pt-24 pb-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        {subject ? subject : "Notes Library"}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {session && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                Session: {session.toUpperCase()}
                            </span>
                        )}
                        {course && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                Course: {course.toUpperCase()}
                            </span>
                        )}

                        {branch && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                Branch: {branch.toUpperCase()}
                            </span>
                        )}

                        {semester && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                Semester: {semester.toUpperCase()}
                            </span>
                        )}
                    </div>

                    <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
                        {subject
                            ? `Browse all available notes for ${subject}`
                            : "Find study materials for your courses"}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesHeader;
