import { useState } from "react";
import Slider from "../Components/Slider";
import image1 from "../assets/images/image1.avif";
import image2 from "../assets/images/image2.avif";
import image3 from "../assets/images/image3.avif";
import { Template1 } from "../../src/HomePage/Components/CarouselData";
import Breadcrumb from "../Components/Breadcrumb";
import Phase3 from "../HomePage/Components/Phase3";
import Phase4 from "../HomePage/Components/Phase4";
import Phase5 from "../HomePage/Components/Phase5";
import Phase6 from "../HomePage/Components/Phase6";
import Phase7 from "../HomePage/Components/Phase7";
import Phase8 from "../HomePage/Components/Phase8";
import Template from "../HomePage/Components/Template";

function Home() {
    const [eventPosted, setEventPosted] = useState(false); // State to track event post

    const images = [{ url: image1 }, { url: image2 }, { url: image3 }];

    // Function to simulate event posting
    const postEvent = () => {
        setEventPosted(true);
        setTimeout(() => {
            setEventPosted(false); // Auto-hide event after 5 seconds
        }, 5000);
    };

    return (
        <div className="bg-[#1E2A38] w-full h-auto flex justify-center items-center flex-col py-5 text-white relative">
            {/* Breadcrumb */}
            <div className="breadcrum w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex justify-between">
                <Breadcrumb />
            </div>

            {/* Event Pop-up */}
            {eventPosted && (
                <div className="event bg-white w-[40%] h-96 z-10 fixed top-[50%] right-0 flex flex-col justify-center items-center p-4 rounded-lg shadow-lg opacity-70">
                    <h2 className="text-xl font-bold text-gray-900">
                        New Event Posted!
                    </h2>
                    <p className="text-gray-700 mt-2">
                        Check out the latest event happening now.
                    </p>
                    <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => setEventPosted(false)}
                    >
                        Close
                    </button>
                </div>
            )}

            {/* Page Header */}
            <div className="topHeading bg-[#17A2B8] w-full max-w-7xl mx-auto text-center py-2 mb-4 rounded-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    Welcome to Our Homepage
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 mt-2">
                    Discover our latest updates and features below.
                </p>
            </div>

            {/* Simulated Event Post Button */}
            <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg mb-4 hover:bg-green-600 transition"
                onClick={postEvent}
            >
                Click to show event
            </button>

            {/* Components */}
            <Slider images={images} />
            <Template Template1={Template1} />
            <Phase3 />
            <Phase4 />
            <Phase5 />
            <Phase6 />
            <Phase7 />
            <Phase8 />
        </div>
    );
}

export default Home;
