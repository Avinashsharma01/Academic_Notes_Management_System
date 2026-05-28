/* eslint-disable react/prop-types */

import Breadcrumb from "../../Components/Breadcrumb";

const CoursesHeader = ({ session }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 pt-6 pb-24 px-6 relative overflow-hidden">
            {/* Breadcrumb */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 mb-6">
                <Breadcrumb />
            </div>

            <div className="max-w-7xl mx-auto mt-4 relative z-10">
                <h1 className="text-4xl font-bold text-white mb-3">
                    Academic Courses
                </h1>
                <p className="text-xl text-white/80 max-w-2xl">
                    Browse available courses for the {session} academic session
                    and explore related branches, subjects, and notes.
                </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/5 rounded-full -mb-36 -mr-36 z-0"></div>
            <div className="absolute top-12 right-32 w-16 h-16 bg-white/5 rounded-full z-0"></div>
            <div className="absolute bottom-12 left-16 w-24 h-24 bg-white/5 rounded-full z-0"></div>
        </div>
    );
};

export default CoursesHeader;
