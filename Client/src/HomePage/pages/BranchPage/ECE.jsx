import { useEffect } from "react";

const ECE = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-[#1E2A38] text-white w-full min-h-screen flex flex-col items-center p-4">
            {/* Header Section */}
            <div className="flex justify-center items-center flex-col mb-12">
                <h1 className="text-5xl font-bold mb-6 text-blue-400 text-center">
                    Electronics & Communication Engineering (ECE)
                </h1>
                <p className="text-lg text-center text-gray-300 max-w-2xl leading-relaxed">
                    The **Electronics and Communication Engineering (ECE)**
                    branch focuses on designing, developing, and maintaining
                    electronic circuits, communication systems, and embedded
                    technologies. ECE engineers work on applications ranging
                    from telecommunications to embedded systems and IoT.
                </p>
            </div>

            {/* Core Subjects Section */}
            <div className="bg-[#2A3A4D] p-4 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Core Subjects
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "Digital Electronics",
                        "Analog Circuits",
                        "Microprocessors & Microcontrollers",
                        "Communication Systems",
                        "VLSI Design",
                        "Signal Processing",
                        "Embedded Systems",
                        "Wireless Communication",
                        "Internet of Things (IoT)",
                    ].map((subject, index) => (
                        <li
                            key={index}
                            className="bg-[#3A4B5F] p-4 rounded-lg hover:bg-[#4A5B6F] transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-lg font-medium">
                                {subject}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Career Opportunities Section */}
            <div className="bg-[#2A3A4D] p-4 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Career Opportunities
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    ECE graduates have vast career options in industries like
                    telecommunications, embedded systems, and semiconductor
                    design.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Electronics Engineer",
                        "Embedded Systems Engineer",
                        "Communication Engineer",
                        "Signal Processing Engineer",
                        "VLSI Design Engineer",
                        "Network Engineer",
                        "IoT Engineer",
                        "Antenna Designer",
                        "Robotics Engineer",
                    ].map((role, index) => (
                        <li
                            key={index}
                            className="bg-[#3A4B5F] p-3 rounded-lg hover:bg-[#4A5B6F] transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-lg">{role}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Top Recruiters Section */}
            <div className="bg-[#2A3A4D] p-4 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Top Recruiters
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    ECE engineers are in demand across multiple industries,
                    including telecom, semiconductor, and automation. Some top
                    recruiters include:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        "Qualcomm",
                        "Intel",
                        "Texas Instruments",
                        "Samsung",
                        "Nokia",
                        "Cisco",
                        "Broadcom",
                        "Ericsson",
                    ].map((company, index) => (
                        <div
                            key={index}
                            className="bg-[#3A4B5F] p-4 rounded-lg flex items-center justify-center hover:bg-[#4A5B6F] transition-all duration-300 cursor-pointer"
                        >
                            <span className="text-lg font-medium">
                                {company}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Eligibility & Admission Section */}
            <div className="bg-[#2A3A4D] p-4 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Eligibility & Admission
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    Admission to the ECE branch is typically through **JEE
                    Mains**, **JEE Advanced**, or state-level engineering
                    entrance exams. A strong background in physics, mathematics,
                    and circuit analysis is essential for success in this field.
                </p>
            </div>
        </div>
    );
};

export default ECE;
