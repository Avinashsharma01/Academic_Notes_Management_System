import { phase3Info } from "../assets/CarouselData";

function Phase3() {
    return (
        <>
            {phase3Info.map((items, index) => (
                <div key={index} className="w-full p-4 md:p-8">
                    {/* Main Container */}
                    <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
                        {/* Left Container */}
                        <div className="w-full md:w-1/4 bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                            <div className="h-32 md:h-48 flex items-center justify-center">
                                <img
                                    src={items.image1}
                                    alt=""
                                    className="h-full object-contain"
                                />
                            </div>
                            <h1 className="text-lg md:text-xl font-bold mt-4 text-white">
                                {items.heading1}
                            </h1>
                            <p className="text-sm md:text-base text-white/80 mt-2">
                                {items.heading2}
                            </p>
                        </div>

                        {/* Right Container */}
                        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Box 1 */}
                            <div className="bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                                <div className="h-16 flex items-center justify-center">
                                    <img
                                        src={items.image2}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg font-bold mt-4 text-white">
                                    {items.heading3}
                                </h1>
                                <p className="text-sm text-white/80 mt-2">
                                    {items.heading4}
                                </p>
                            </div>

                            {/* Box 2 */}
                            <div className="bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                                <div className="h-16 flex items-center justify-center">
                                    <img
                                        src={items.image3}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg font-bold mt-4 text-white">
                                    {items.heading5}
                                </h1>
                                <p className="text-sm text-white/80 mt-2">
                                    {items.heading6}
                                </p>
                            </div>

                            {/* Box 3 */}
                            <div className="bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                                <div className="h-16 flex items-center justify-center">
                                    <img
                                        src={items.image4}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg font-bold mt-4 text-white">
                                    {items.heading7}
                                </h1>
                                <p className="text-sm text-white/80 mt-2">
                                    {items.heading8}
                                </p>
                            </div>

                            {/* Box 4 */}
                            <div className="bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                                <div className="h-16 flex items-center justify-center">
                                    <img
                                        src={items.image5}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg font-bold mt-4 text-white">
                                    {items.heading9}
                                </h1>
                                <p className="text-sm text-white/80 mt-2">
                                    {items.heading10}
                                </p>
                            </div>

                            {/* Box 5 */}
                            <div className="bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                                <div className="h-16 flex items-center justify-center">
                                    <img
                                        src={items.image6}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg font-bold mt-4 text-white">
                                    {items.heading11}
                                </h1>
                                <p className="text-sm text-white/80 mt-2">
                                    {items.heading12}
                                </p>
                            </div>
                            {/* Box 6 */}
                            <div className="bg-[#0cbcbc] rounded-lg p-4 hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                                <div className="h-16 flex items-center justify-center">
                                    <img
                                        src={items.image6}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                                <h1 className="text-lg font-bold mt-4 text-white">
                                    {items.heading11}
                                </h1>
                                <p className="text-sm text-white/80 mt-2">
                                    {items.heading12}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Phase3;
