import { useState, useEffect } from "react";
import { Phase5_Gsap } from "./Gsap";
import { useNavigate } from "react-router-dom";

const AnotherPhase5 = () => {
    const Navigate = useNavigate();
    Phase5_Gsap();

    const branches = [
        {
            name: "CSE",
            desc: "Computer Science focuses on coding, AI, and software development.",
        },
        {
            name: "IT",
            desc: "Information Technology deals with networks, cybersecurity, and databases.",
        },
        {
            name: "CIVIL",
            desc: "Civil Engineering designs and constructs buildings, roads, and bridges.",
        },
        {
            name: "MECHANICAL",
            desc: "Mechanical Engineering involves machines, robotics, and thermodynamics.",
        },
        {
            name: "ECE",
            desc: "Electronics & Communication covers circuits, IoT, and telecommunications.",
        },
        {
            name: "EEE",
            desc: "Electrical Engineering focuses on power systems, automation, and energy.",
        },
    ];

    const [startIndex, setStartIndex] = useState(0);
    const [visibleBoxes, setVisibleBoxes] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setVisibleBoxes(1); // Extra small screens (phones)
            } else if (window.innerWidth < 768) {
                setVisibleBoxes(2); // Small screens (tablets)
            } else if (window.innerWidth < 1024) {
                setVisibleBoxes(3); // Medium screens
            } else {
                setVisibleBoxes(4); // Large screens
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        if (startIndex + visibleBoxes < branches.length) {
            setStartIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center mt-12">
            {/* Carousel Container */}
            <div className="relative flex items-center w-full max-w-6xl">
                {/* Previous Button */}
                <button
                    className={`absolute left-0 z-10 w-10 h-10 flex justify-center items-center bg-green-700 text-white rounded-full shadow-md hover:bg-green-600 transition-all ${
                        startIndex === 0 ? "opacity-0 pointer-events-none" : ""
                    }`}
                    onClick={handlePrev}
                >
                    ◀️
                </button>

                {/* Carousel Boxes */}
                <div className="flex gap-3 w-full justify-center overflow-hidden">
                    {branches
                        .slice(startIndex, startIndex + visibleBoxes)
                        .map((box, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center h-60 w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] p-4 text-center text-white font-semibold rounded-lg bg-[#55aec4] shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() =>
                                    Navigate(`/${box.name.toLowerCase()}`)
                                }
                            >
                                <h2 className="text-xl md:text-2xl font-bold uppercase mb-2">
                                    {box.name}
                                </h2>
                                <p className="text-sm md:text-base font-medium">
                                    {box.desc}
                                </p>
                            </div>
                        ))}
                </div>

                {/* Next Button */}
                <button
                    className={`absolute right-0 z-10 w-10 h-10 flex justify-center items-center bg-green-700 text-white rounded-full shadow-md hover:bg-green-600 transition-all ${
                        startIndex + visibleBoxes >= branches.length
                            ? "opacity-0 pointer-events-none"
                            : ""
                    }`}
                    onClick={handleNext}
                >
                    ▶️
                </button>
            </div>

            {/* Pagination Dots for Small Screens */}
            <div className="flex justify-center mt-4 space-x-2">
                {branches.map((_, i) => (
                    <span
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${
                            i >= startIndex && i < startIndex + visibleBoxes
                                ? "bg-green-700"
                                : "bg-gray-400"
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default AnotherPhase5;
