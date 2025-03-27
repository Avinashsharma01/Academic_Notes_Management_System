import { useEffect } from "react";

const EEE = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="bg-[#1E2A38] text-white w-full min-h-screen flex flex-col items-center p-8">
            {/* Header Section */}
            <div className="flex justify-center items-center flex-col mb-12">
                <h1 className="text-5xl font-bold mb-6 text-blue-400">
                    Electrical & Electronics Engineering (EEE)
                </h1>
                <p className="text-lg text-center text-gray-300 max-w-2xl leading-relaxed">
                    The **Electrical and Electronics Engineering (EEE)** branch
                    focuses on the study of electrical systems, circuits, and
                    electronic devices. It plays a crucial role in power
                    generation, automation, robotics, and communication
                    technologies.
                </p>
            </div>

            {/* Core Subjects Section */}
            <div className="bg-[#2A3A4D] p-8 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Core Subjects
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "Electrical Machines",
                        "Power Systems",
                        "Control Systems",
                        "Digital & Analog Electronics",
                        "Microprocessors & Microcontrollers",
                        "Power Electronics",
                        "Renewable Energy Systems",
                        "High Voltage Engineering",
                        "Embedded Systems",
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
            <div className="bg-[#2A3A4D] p-8 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Career Opportunities
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    EEE graduates have diverse career options in power
                    generation, automation, and electrical systems design.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Power Systems Engineer",
                        "Electrical Design Engineer",
                        "Automation Engineer",
                        "Embedded Systems Engineer",
                        "Renewable Energy Specialist",
                        "Robotics Engineer",
                        "Control Systems Engineer",
                        "Research & Development Engineer",
                        "Electrical Safety Engineer",
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
            <div className="bg-[#2A3A4D] p-8 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Top Recruiters
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    EEE graduates are recruited by top companies in power,
                    automation, and electrical industries, including:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        "Siemens",
                        "ABB",
                        "General Electric (GE)",
                        "Schneider Electric",
                        "BHEL",
                        "Tata Power",
                        "L&T Electrical & Automation",
                        "Philips",
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
            <div className="bg-[#2A3A4D] p-8 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Eligibility & Admission
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    Admission to the EEE branch is primarily through **JEE
                    Mains**, **JEE Advanced**, or state-level entrance exams. A
                    strong foundation in physics, mathematics, and circuit
                    analysis is essential for success in this field.
                </p>
            </div>
        </div>
    );
};

export default EEE;
