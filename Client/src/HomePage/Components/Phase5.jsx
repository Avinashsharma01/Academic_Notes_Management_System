import { useState, useEffect } from "react";
import { Phase5_Gsap } from "./Gsap";
import { useNavigate } from "react-router-dom";

const Phase5 = () => {
    const Navigate = useNavigate();
    Phase5_Gsap();

    const branches = [
        {
            name: "CSE",
            desc: "Computer Science focuses on coding, AI, and software development.",
            img: "../../../src/HomePage/pages/BranchPage/assests/CSE.jpg",
        },
        {
            name: "IT",
            desc: "Information Technology deals with networks, cybersecurity, and databases.",
            img: "../../../src/HomePage/pages/BranchPage/assests/IT.jpg",
        },
        {
            name: "CIVIL",
            desc: "Civil Engineering designs and constructs buildings, roads, and bridges.",
            img: "../../../src/HomePage/pages/BranchPage/assests/CIVILIIMG.jpg",
        },
        {
            name: "MECHANICAL",
            desc: "Mechanical Engineering involves machines, robotics, and thermodynamics.",
            img: "../../../src/HomePage/pages/BranchPage/assests/MACHENICALIMG.jpg",
        },
        {
            name: "ECE",
            desc: "Electronics & Communication covers circuits, IoT, and telecommunications.",
            img: "../../../src/HomePage/pages/BranchPage/assests/ECEIMG.jpg",
        },
        {
            name: "EEE",
            desc: "Electrical Engineering focuses on power systems, automation, and energy.",
            img: "../../../src/HomePage/pages/BranchPage/assests/EEEIMG.jpg",
        },
    ];

    const [startIndex, setStartIndex] = useState(0);
    const [visibleBoxes, setVisibleBoxes] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleBoxes(1); // Small screens (phones)
            } else if (window.innerWidth < 1024) {
                setVisibleBoxes(2); // Medium screens (tablets)
            } else {
                setVisibleBoxes(3); // Large screens (desktops)
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        if (startIndex + visibleBoxes < branches.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center mt-12 gap-4 overflow-hidden p-4">
            {/* Carousel Container */}
            <div className="w-full flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                    className="w-10 h-10 flex justify-center items-center bg-green-700 text-white rounded-full shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                >
                    ◀️
                </button>

                {/* Carousel Boxes */}
                <div className="flex gap-4 overflow-hidden w-full max-w-7xl justify-center">
                    {branches
                        .slice(startIndex, startIndex + visibleBoxes)
                        .map((box, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center justify-center h-60 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] p-4 text-center text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                                style={{
                                    backgroundImage: `url(${box.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                onClick={() =>
                                    Navigate(`/${box.name.toLowerCase()}`)
                                }
                                id="addBG"
                            >
                                <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold uppercase mb-2">
                                        {box.name}
                                    </h2>
                                    <p className="text-base font-medium">
                                        {box.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Next Button */}
                <button
                    className="w-10 h-10 flex justify-center items-center bg-green-700 text-white rounded-full shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNext}
                    disabled={startIndex + visibleBoxes >= branches.length}
                >
                    ▶️
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-4">
                {Array.from(
                    { length: branches.length - visibleBoxes + 1 },
                    (_, i) => (
                        <button
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                                i === startIndex
                                    ? "bg-green-700"
                                    : "bg-gray-300"
                            }`}
                            onClick={() => setStartIndex(i)}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Phase5;
