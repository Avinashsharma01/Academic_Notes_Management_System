/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
        <div className="relative w-full overflow-hidden rounded-lg shadow-2xl group">
            {/* Gradient overlay for top and bottom */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-900/60 to-transparent z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>

            {/* Image container */}
            <div
                className="flex transition-all duration-700 ease-in-out"
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
                {images.map((imageObj, index) => (
                    <div
                        key={index}
                        className="relative w-full flex-shrink-0 overflow-hidden"
                    >
                        <img
                            src={imageObj.url}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {imageObj.text && (
                            <div className="absolute bottom-16 left-0 right-0 mx-auto max-w-3xl px-6 z-20">
                                <div className="bg-slate-800/70 backdrop-blur-sm text-white p-4 rounded-lg border-l-4 border-blue-500 shadow-lg transform transition-transform duration-500 ease-out">
                                    <h3 className="text-xl font-bold text-blue-400 mb-1">
                                        {imageObj.title || "Slide Title"}
                                    </h3>
                                    <p>{imageObj.text}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={() => slideTo(currentIndex - 1)}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-slate-800/50 hover:bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-lg opacity-70 hover:opacity-100 z-20"
                aria-label="Previous slide"
            >
                <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <button
                onClick={() => slideTo(currentIndex + 1)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-slate-800/50 hover:bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/10 shadow-lg opacity-70 hover:opacity-100 z-20"
                aria-label="Next slide"
            >
                <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => slideTo(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index
                                ? "bg-blue-500 w-4 md:w-6"
                                : "bg-white/40 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Current slide indicator */}
            <div className="absolute top-4 right-4 bg-slate-800/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-20 font-medium">
                {currentIndex + 1} / {totalImages}
            </div>
        </div>
    );
};

export default Slider;
