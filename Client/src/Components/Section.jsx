/* eslint-disable react/prop-types */
import React from "react";

function Section({ Template1 }) {
    return (
        <div className="w-full flex flex-col items-center mb-5">
            <div className="w-4/5 mt-5 bg-[rgba(74,231,242,0.411)] rounded-lg p-5 hover:shadow-lg hover:transition-all hover:duration-500">
                {Template1.map((templateItem, index) => (
                    <React.Fragment key={index}>
                        <h1 className="text-center text-3xl md:text-2xl sm:text-xl font-extrabold mt-3">
                            {templateItem.heading1}
                        </h1>
                        <p className="text-center text-base md:text-sm sm:text-xs font-light text-gray-600 mt-2">
                            {templateItem.heading2}
                        </p>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Section;
