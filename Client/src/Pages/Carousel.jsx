import { useState } from "react";

const Carousel = () => {
    const boxes = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6"];
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        if (startIndex + 3 < boxes.length) {
            setStartIndex(startIndex + 3);
        }
    };

    const handlePrev = () => {
        if (startIndex - 3 >= 0) {
            setStartIndex(startIndex - 3);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-10">
            {/* Previous Button */}
            <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                ◀ Prev
            </button>

            {/* Carousel Box Container */}
            <div className="flex gap-4 overflow-hidden">
                {boxes.slice(startIndex, startIndex + 3).map((box, index) => (
                    <div
                        key={index}
                        className="w-24 h-24 bg-blue-300 flex items-center justify-center text-lg font-bold rounded-lg shadow-lg"
                    >
                        {box}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={startIndex + 3 >= boxes.length}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
                Next ▶
            </button>
        </div>
    );
};

export default Carousel;
