import { useState } from "react";
import "./Phase5.css"; // Import the CSS file for styling

const Phase5 = () => {
    const boxes = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5", "Box 6"];
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        if (startIndex + 1 < boxes.length) {
            setStartIndex(startIndex + 3);
        }
    };

    const handlePrev = () => {
        if (startIndex - 1 >= 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="Phase5-carousel-container">
            <button className="Button-box" onClick={handlePrev} disabled={startIndex === 0}>
                ◀️ 
            </button>
            <div className="carousel-boxes">
                {boxes.slice(startIndex, startIndex + 3).map((box, index) => (
                    <div key={index} className="box">
                        {box}
                    </div>
                ))}
            </div>
            <button className="Button-box"
                onClick={handleNext}
                disabled={startIndex + 3 >= boxes.length}
            >
                 ▶️
            </button>
        </div>
    );
};

export default Phase5;