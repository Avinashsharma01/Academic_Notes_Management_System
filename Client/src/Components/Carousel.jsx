/* eslint-disable react/prop-types */
import { useState } from "react";

function Carousel({ items }) {
    const [current, setCurrent] = useState(0);

    const slideLeft = () => {
        setCurrent(current === 0 ? items.length - 1 : current - 1);
    };

    const slideRight = () => {
        setCurrent(current === items.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="carousel block h-[500px] w-full mt-2 relative">
            <div className="relative w-full h-full">
                {items.map((imageItem, index) => (
                    <div
                        key={index}
                        className={`${
                            index === current
                                ? "opacity-100 scale-100 pointer-events-auto z-10"
                                : "opacity-0 scale-90 pointer-events-none"
                        } absolute w-full h-full overflow-hidden border border-gray-300 shadow-md transition-all duration-700 ease-out`}
                    >
                        <img
                            className="w-full object-cover object-center"
                            src={imageItem.image}
                            alt={imageItem.titel}
                        />
                        <div className="absolute w-full h-full bg-black bg-opacity-30 flex items-end p-10">
                            <h2 className="text-white text-3xl">
                                {imageItem.titel}
                            </h2>
                        </div>
                    </div>
                ))}
                {/* Left Arrow */}
                <div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl bg-aliceblue flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-blue-500 transition-colors duration-300"
                    onClick={slideLeft}
                    style={{ zIndex: 20 }}
                >
                    &lsaquo;
                </div>
                {/* Right Arrow */}
                <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl bg-aliceblue flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-blue-500 transition-colors duration-300"
                    onClick={slideRight}
                    style={{ zIndex: 20 }}
                >
                    &rsaquo;
                </div>
                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`${
                                index === current
                                    ? "bg-blueviolet scale-125"
                                    : "bg-aquamarine"
                            } w-3 h-3 rounded-full cursor-pointer transition-all duration-300`}
                            onClick={() => setCurrent(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;
