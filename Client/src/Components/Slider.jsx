/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Slider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = images.length;

    // Function to handle sliding to a specific index
    const slideTo = (index) => {
        if (index < 0) {
            setCurrentIndex(totalImages - 1);
        } else if (index >= totalImages) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(index);
        }
    };

    // Automatically slide images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            slideTo(currentIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="relative w-full overflow-hidden">
            {/* Image container */}
            <div
                className="flex transition-transform duration-1500 ease-in-out"
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
                {images.map((imageObj, index) => (
                    <div key={index} className="relative w-full flex-shrink-0">
                        <img
                            src={imageObj.url}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto"
                        />
                        {/* Text overlay
                        {imageObj.text && (
                            <div className="absolute bottom-12 left-12 text-white text-xl bg-black bg-opacity-50 px-4 py-2 rounded">
                                {imageObj.text}
                            </div>
                        )} */}
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                id="next"
                onClick={() => slideTo(currentIndex + 1)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 max-md:w-10  max-md:text-[10px] max-md:flex max-md:justify-center max-md:items-center "
            >
                Next
            </button>
            <button
                id="pre"
                onClick={() => slideTo(currentIndex - 1)}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75  max-md:w-10  max-md:text-[10px] max-md:flex max-md:justify-center max-md:items-center"
            >
                Prev
            </button>

            {/* Dots navigation */}
            <div className="Dotn-avigation absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => slideTo(index)}
                        className={` dot w-4 h-4 max-sm:h-2  rounded-full cursor-pointer ${
                            currentIndex === index
                                ? "bg-lime-500"
                                : "bg-black bg-opacity-50"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
