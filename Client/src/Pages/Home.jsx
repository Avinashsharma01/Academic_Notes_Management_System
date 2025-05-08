/* eslint-disable react/no-unescaped-entities */
import { useEffect, useContext } from "react";
import Breadcrumb from "../Components/Breadcrumb";
import Slider from "../Components/Slider";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";

function Home() {
    const { user } = useContext(AuthContext);
    const { admin } = useContext(AuthContext);
    const images = [
        { url: image1 },
        { url: image2 },
        { url: image3 },
        { url: image4 },
        { url: image5 },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-black w-full min-h-screen">
            {/* Hero Section with Carousel */}
            <section className="relative">
                {/* Breadcrumb */}
                <div className="absolute top-0 left-0 right-0 z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-4">
                    <Breadcrumb />
                </div>

                {/* Full-width Carousel */}
                <div className="w-full max-h-[600px] overflow-hidden">
                    <Slider images={images} />
                </div>

                {/* Hero Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex items-end">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 max-w-3xl">
                            Your Academic Journey Starts Here
                        </h1>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl">
                            Access, manage, and share academic resources
                            seamlessly with our notes management system.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/notes"
                                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                            >
                                Browse Notes
                            </Link>
                            {user || admin ? null : (
                                <Link
                                    to="/signup"
                                    className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our academic notes management system is designed to
                            streamline your educational experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Organized Notes
                            </h3>
                            <p className="text-gray-600">
                                Access notes organized by course, semester,
                                subject, and more. Never lose track of important
                                materials again.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Easy Downloads
                            </h3>
                            <p className="text-gray-600">
                                Download notes with a single click. Study
                                anywhere, even offline, with our user-friendly
                                interface.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Community Sharing
                            </h3>
                            <p className="text-gray-600">
                                Share valuable resources with peers. Collaborate
                                and grow together in your academic journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Notes Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Latest Notes
                        </h2>
                        <Link
                            to="/notes"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            View all
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Note Card 1 */}
                        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-3 bg-blue-600"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                            B.Tech
                                        </span>
                                        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full ml-2">
                                            CSE
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        3rd Sem
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Data Structures & Algorithms
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    Comprehensive notes covering sorting
                                    algorithms, tree structures, and graph
                                    algorithms.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        Uploaded: May 1, 2025
                                    </span>
                                    <Link
                                        to="#"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Note Card 2 */}
                        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-3 bg-green-600"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                            MCA
                                        </span>
                                        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full ml-2">
                                            IT
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        2nd Sem
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Database Management Systems
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    Complete notes on relational database
                                    design, SQL, and normalization techniques.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        Uploaded: Apr 28, 5
                                    </span>
                                    <Link
                                        to="#"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Note Card 3 */}
                        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-3 bg-purple-600"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                            B.Sc
                                        </span>
                                        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full ml-2">
                                            Physics
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        4th Sem
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Quantum Mechanics
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    Detailed notes on wave functions,
                                    Schrödinger equation, and quantum phenomena.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        Uploaded: Apr 25, 2025
                                    </span>
                                    <Link
                                        to="#"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Note Card 4 */}
                        <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-3 bg-red-600"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                            M.Tech
                                        </span>
                                        <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full ml-2">
                                            AI/ML
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        1st Sem
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Machine Learning Fundamentals
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    Introduction to supervised and unsupervised
                                    learning algorithms and techniques.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        Uploaded: Apr 22, 2025
                                    </span>
                                    <Link
                                        to="#"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            Join thousands of students already benefiting from
                            our platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">5000+</div>
                            <div className="text-white/80 text-lg">
                                Students
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">2500+</div>
                            <div className="text-white/80 text-lg">Notes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">50+</div>
                            <div className="text-white/80 text-lg">
                                Subjects
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">15+</div>
                            <div className="text-white/80 text-lg">
                                Branches
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Hear from students who have transformed their
                            academic experience with our platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                                    <span className="font-bold">AS</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Avinash Sharma
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        B.Tech, IT
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "This platform has been a lifesaver during exam
                                preparations. The organized notes and easy
                                download feature helped me study efficiently."
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
                                    <span className="font-bold">SK</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Soumya Kumari
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        B.Tech, CSE
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "As a working professional pursuing MCA, this
                                platform has made it possible for me to access
                                quality notes even when I miss classes."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-4">
                                    <span className="font-bold">RS</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Rahul Sharma
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        B.Tech, CSE
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                "The quality of notes available here is
                                exceptional. I've been able to understand
                                complex concepts much better thanks to these
                                resources."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            Ready to Enhance Your Academic Journey?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                            Join thousands of students who are already
                            benefiting from our comprehensive note management
                            system.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {user || admin ? null : (
                                <Link
                                    to="/signup"
                                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                                >
                                    Sign Up Now
                                </Link>
                            )}
                            <Link
                                to="/notes"
                                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105"
                            >
                                Browse Notes
                            </Link>
                        </div>
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
            </section>
        </div>
    );
}

export default Home;
