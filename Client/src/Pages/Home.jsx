import Breadcrumb from "../Components/Breadcrumb";
import Slider from "../Components/Slider";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";

function Home() {
    const images = [
        { url: image1 },
        { url: image2 },
        { url: image3 },
        { url: image4 },
        { url: image5 },
        // { url: image6 },
    ];

    return (
        // bg-[#1E2A38] bg-gradient-to-br from-blue-50 to-purple-50
        <div className="bg-white text-black  w-full h-auto flex justify-center items-center flex-col py-5  relative">
            {/* Breadcrumb */}
            <div className="breadcrum w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex justify-between">
                <Breadcrumb />
            </div>

            {/* Page Header */}
            <div className="topHeading bg-[#17A2B8] max-sm:w-[90%] sm:w-[90%] w-full max-w-7xl mx-auto text-center py-2 mb-4 rounded-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    Welcome to Academic Notes Management System
                </h1>
            </div>

            {/* Components */}
            <Slider images={images} />
        </div>
    );
}

export default Home;
