import { useState, useEffect } from "react";

const Phase5 = () => {
    const boxes = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6"];
    const [startIndex, setStartIndex] = useState(0);
    const [visibleBoxes, setVisibleBoxes] = useState(1); // Default to 1 box on small screens

    // Update the number of visible boxes based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleBoxes(1); // 1 box on phones
            } else if (window.innerWidth < 1024) {
                setVisibleBoxes(2); // 2 boxes on tablets
            } else {
                setVisibleBoxes(3); // 3 boxes on desktops
            }
        };

        // Set initial value
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNext = () => {
        if (startIndex + visibleBoxes < boxes.length) {
            setStartIndex(startIndex + visibleBoxes);
        }
    };

    const handlePrev = () => {
        if (startIndex - visibleBoxes >= 0) {
            setStartIndex(startIndex - visibleBoxes);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2.5 w-full mt-8 p-5">
            {/* Previous Button */}
            <button
                className="p-2.5 border-none cursor-pointer text-base text-white rounded-full h-10 w-10 bg-gray-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center"
                onClick={handlePrev}
                disabled={startIndex === 0}
            >
                ◀️
            </button>

            {/* Carousel Boxes */}
            <div className="flex gap-2.5 overflow-hidden w-4/5">
                {boxes
                    .slice(startIndex, startIndex + visibleBoxes)
                    .map((box, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-full h-60 text-lg font-bold rounded-lg bg-[#55aec4]"
                        >
                            {box}
                        </div>
                    ))}
            </div>

            {/* Next Button */}
            <button
                className="p-2.5 border-none cursor-pointer text-base text-white rounded-full h-10 w-10 bg-gray-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center"
                onClick={handleNext}
                disabled={startIndex + visibleBoxes >= boxes.length}
            >
                ▶️
            </button>
        </div>
    );
};

export default Phase5;
