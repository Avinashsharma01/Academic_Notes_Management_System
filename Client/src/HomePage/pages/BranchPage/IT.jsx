const IT = () => {
    return (
        <div className="bg-[#1E2A38] text-white w-full min-h-screen flex flex-col items-center p-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-6 text-blue-400">
                    Information Technology (IT)
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                    The **Information Technology (IT)** branch of B.Tech focuses
                    on the application of technology to solve real-world
                    problems, including software development, networking,
                    cybersecurity, and data management. IT professionals are at
                    the forefront of innovation, driving advancements in
                    technology and business.
                </p>
            </div>

            {/* Core Subjects Section */}
            <div className="bg-[#2A3A4D] p-8 rounded-lg w-full max-w-4xl mb-12 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6 text-blue-400">
                    Core Subjects
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "Software Engineering",
                        "Computer Networks",
                        "Database Systems",
                        "Cybersecurity",
                        "Web Technologies",
                        "Cloud Computing",
                        "Data Structures & Algorithms",
                        "Operating Systems",
                        "Artificial Intelligence",
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
                    IT graduates have a wide range of career opportunities in
                    fields such as:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Software Development",
                        "Network Administration",
                        "Cybersecurity Analyst",
                        "Data Scientist",
                        "Cloud Architect",
                        "IT Consultant",
                        "Web Developer",
                        "System Administrator",
                        "AI/ML Engineer",
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
                    IT graduates are highly sought after by top companies
                    worldwide. Some of the leading recruiters include:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        "Google",
                        "Microsoft",
                        "Amazon",
                        "IBM",
                        "Infosys",
                        "TCS",
                        "Accenture",
                        "Wipro",
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
                    Admission to the IT branch is typically based on entrance
                    exams like **JEE Mains**, **JEE Advanced**, or state-level
                    engineering entrance tests. Candidates must have a strong
                    foundation in mathematics and science to excel in this
                    field.
                </p>
            </div>
        </div>
    );
};

export default IT;
