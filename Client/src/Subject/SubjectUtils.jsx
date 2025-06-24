import {
    // Importing all the icons we need for subject cards
    FaBook,
    FaNetworkWired,
    FaServer,
    FaDatabase,
    FaCalculator,
    FaAtom,
    FaFlask,
    FaCode,
    FaBolt,
    FaDraftingCompass,
    FaLeaf,
    FaMicrochip,
    FaComments,
    FaCog,
    FaProjectDiagram,
    FaBrain,
    FaCloud,
    FaGlobe,
    FaCubes,
    FaShieldAlt,
    FaMobile,
    FaVrCardboard,
    FaChartBar,
    FaGraduationCap,
    FaBriefcase,
    FaUserTie,
} from "react-icons/fa";

// Map of subject names to icons and colors
const subjectIcons = {
    // Semester 1
    "Mathematics - I": <FaCalculator size={32} />,
    Physics: <FaAtom size={32} />,
    Chemistry: <FaFlask size={32} />,
    "Programming for Problem Solving": <FaCode size={32} />,
    "Basic Electrical Engineering": <FaBolt size={32} />,
    "Engineering Graphics": <FaDraftingCompass size={32} />,
    "Environmental Science": <FaLeaf size={32} />,
    "Physics Lab": <FaAtom size={32} />,
    "Chemistry Lab": <FaFlask size={32} />,
    "Programming Lab": <FaCode size={32} />,

    // Semester 2
    "Mathematics - II": <FaCalculator size={32} />,
    "Basic Electronics Engineering": <FaMicrochip size={32} />,
    "Data Structures and Algorithms": <FaDatabase size={32} />,
    "Digital Logic Design": <FaMicrochip size={32} />,
    "Engineering Mechanics": <FaCog size={32} />,
    "Communication Skills": <FaComments size={32} />,
    "Data Structures Lab": <FaDatabase size={32} />,
    "Electronics Lab": <FaMicrochip size={32} />,
    "Workshop Practice": <FaCog size={32} />,

    // Semester 3
    "Mathematics - III": <FaCalculator size={32} />,
    "Object Oriented Programming": <FaCode size={32} />,
    "Computer Organization and Architecture": <FaServer size={32} />,
    "Discrete Mathematics": <FaProjectDiagram size={32} />,
    "Operating Systems": <FaServer size={32} />,
    "Design and Analysis of Algorithms": <FaProjectDiagram size={32} />,
    "Object Oriented Programming Lab": <FaCode size={32} />,
    "Operating Systems Lab": <FaServer size={32} />,
    "Algorithms Lab": <FaProjectDiagram size={32} />,

    // Semester 4
    "Theory of Computation": <FaBook size={32} />,
    "Database Management Systems": <FaDatabase size={32} />,
    "Software Engineering": <FaCog size={32} />,
    "Computer Networks": <FaNetworkWired size={32} />,
    "Microprocessors and Microcontrollers": <FaMicrochip size={32} />,
    "DBMS Lab": <FaDatabase size={32} />,
    "Networks Lab": <FaNetworkWired size={32} />,
    "Software Engineering Lab": <FaCog size={32} />,
    "Microprocessor Lab": <FaMicrochip size={32} />,

    // Semester 5
    "Artificial Intelligence": <FaBrain size={32} />,
    "Compiler Design": <FaCode size={32} />,
    "Machine Learning": <FaBrain size={32} />,
    "Cloud Computing": <FaCloud size={32} />,
    "Web Technologies": <FaGlobe size={32} />,
    "Computer Graphics": <FaCubes size={32} />,
    "AI Lab": <FaBrain size={32} />,
    "Web Technologies Lab": <FaGlobe size={32} />,
    "Computer Graphics Lab": <FaCubes size={32} />,

    // Semester 6
    "Big Data Analytics": <FaChartBar size={32} />,
    "Cyber Security": <FaShieldAlt size={32} />,
    "Internet of Things (IoT)": <FaMicrochip size={32} />,
    "Blockchain Technology": <FaCubes size={32} />,
    "Software Testing": <FaCog size={32} />,
    "Mobile Computing": <FaMobile size={32} />,
    "Big Data Lab": <FaChartBar size={32} />,
    "IoT Lab": <FaMicrochip size={32} />,
    "Cyber Security Lab": <FaShieldAlt size={32} />,

    // Semester 7
    "Deep Learning": <FaBrain size={32} />,
    "Natural Language Processing": <FaComments size={32} />,
    "Augmented and Virtual Reality": <FaVrCardboard size={32} />,
    "Quantum Computing": <FaAtom size={32} />,
    "Data Science": <FaChartBar size={32} />,
    "Deep Learning Lab": <FaBrain size={32} />,
    "NLP Lab": <FaComments size={32} />,
    "Elective - 1": <FaBook size={32} />,

    // Semester 8
    "Capstone Project": <FaProjectDiagram size={32} />,
    "IT Ethics": <FaShieldAlt size={32} />,
    "IT Innovation and Entrepreneurship": <FaUserTie size={32} />,
    "Industry Internship": <FaBriefcase size={32} />,
    "Professional Development": <FaGraduationCap size={32} />,
};

// Get a color for a specific subject
const getSubjectColor = (subject) => {
    const colors = {
        // Mathematics related
        "Mathematics - I": "from-blue-500 to-blue-600",
        "Mathematics - II": "from-blue-500 to-blue-600",
        "Mathematics - III": "from-blue-500 to-blue-600",
        "Discrete Mathematics": "from-blue-500 to-blue-600",

        // Physics related
        Physics: "from-purple-500 to-purple-600",
        "Physics Lab": "from-purple-500 to-purple-600",

        // Chemistry related
        Chemistry: "from-green-500 to-green-600",
        "Chemistry Lab": "from-green-500 to-green-600",

        // Programming related
        "Programming for Problem Solving": "from-indigo-500 to-indigo-600",
        "Programming Lab": "from-indigo-500 to-indigo-600",
        "Object Oriented Programming": "from-indigo-600 to-indigo-700",
        "Object Oriented Programming Lab": "from-indigo-600 to-indigo-700",
        "Data Structures and Algorithms": "from-violet-500 to-violet-600",
        "Data Structures Lab": "from-violet-500 to-violet-600",
        "Design and Analysis of Algorithms": "from-violet-600 to-violet-700",
        "Algorithms Lab": "from-violet-600 to-violet-700",

        // Hardware and Architecture
        "Basic Electrical Engineering": "from-yellow-500 to-yellow-600",
        "Basic Electronics Engineering": "from-yellow-600 to-yellow-700",
        "Computer Organization and Architecture": "from-amber-500 to-amber-600",
        "Microprocessors and Microcontrollers": "from-amber-600 to-amber-700",
        "Digital Logic Design": "from-orange-500 to-orange-600",
        "Electronics Lab": "from-yellow-600 to-yellow-700",
        "Microprocessor Lab": "from-amber-600 to-amber-700",

        // General Engineering
        "Engineering Graphics": "from-gray-500 to-gray-600",
        "Engineering Mechanics": "from-gray-600 to-gray-700",
        "Workshop Practice": "from-gray-500 to-gray-600",
        "Environmental Science": "from-emerald-500 to-emerald-600",

        // Database related
        "Database Management Systems": "from-pink-500 to-pink-600",
        "DBMS Lab": "from-pink-500 to-pink-600",

        // Networks and Systems
        "Computer Networks": "from-cyan-500 to-cyan-600",
        "Networks Lab": "from-cyan-500 to-cyan-600",
        "Operating Systems": "from-teal-500 to-teal-600",
        "Operating Systems Lab": "from-teal-500 to-teal-600",

        // Theoretical CS
        "Theory of Computation": "from-rose-500 to-rose-600",

        // Software related
        "Software Engineering": "from-sky-500 to-sky-600",
        "Software Engineering Lab": "from-sky-500 to-sky-600",
        "Software Testing": "from-sky-600 to-sky-700",
        "Compiler Design": "from-red-500 to-red-600",
        "Web Technologies": "from-blue-400 to-blue-500",
        "Web Technologies Lab": "from-blue-400 to-blue-500",

        // AI and ML
        "Artificial Intelligence": "from-fuchsia-500 to-fuchsia-600",
        "AI Lab": "from-fuchsia-500 to-fuchsia-600",
        "Machine Learning": "from-fuchsia-600 to-fuchsia-700",
        "Deep Learning": "from-fuchsia-700 to-fuchsia-800",
        "Deep Learning Lab": "from-fuchsia-700 to-fuchsia-800",
        "Natural Language Processing": "from-purple-400 to-purple-500",
        "NLP Lab": "from-purple-400 to-purple-500",
        "Data Science": "from-indigo-400 to-indigo-500",

        // Advanced topics
        "Big Data Analytics": "from-blue-600 to-blue-700",
        "Big Data Lab": "from-blue-600 to-blue-700",
        "Cloud Computing": "from-sky-400 to-sky-500",
        "Internet of Things (IoT)": "from-emerald-400 to-emerald-500",
        "IoT Lab": "from-emerald-400 to-emerald-500",
        "Blockchain Technology": "from-amber-400 to-amber-500",
        "Cyber Security": "from-red-600 to-red-700",
        "Cyber Security Lab": "from-red-600 to-red-700",
        "Augmented and Virtual Reality": "from-violet-400 to-violet-500",
        "Quantum Computing": "from-purple-600 to-purple-700",
        "Mobile Computing": "from-blue-500 to-blue-600",
        "Computer Graphics": "from-green-400 to-green-500",
        "Computer Graphics Lab": "from-green-400 to-green-500",

        // Final year
        "Capstone Project": "from-indigo-500 to-indigo-600",
        "IT Ethics": "from-red-500 to-red-600",
        "IT Innovation and Entrepreneurship": "from-amber-500 to-amber-600",
        "Industry Internship": "from-blue-500 to-blue-600",
        "Professional Development": "from-green-500 to-green-600",
        "Elective - 1": "from-purple-500 to-purple-600",

        // Communication
        "Communication Skills": "from-teal-400 to-teal-500",
    };
    return colors[subject] || "from-gray-600 to-gray-700";
};

// Get subject descriptions
const getSubjectDescription = (subject) => {
    const descriptions = {
        // Semester 1
        "Mathematics - I":
            "Study of calculus, matrices, and differential equations",
        Physics: "Principles of mechanics, electricity, and magnetism",
        Chemistry: "Study of matter, its properties, and reactions",
        "Programming for Problem Solving":
            "Introduction to programming concepts and problem solving techniques",
        "Basic Electrical Engineering":
            "Fundamentals of electrical circuits and electrical systems",
        "Engineering Graphics": "Technical drawing and design visualization",
        "Environmental Science": "Study of ecosystems and environmental impact",
        "Physics Lab": "Practical experiments in physics principles",
        "Chemistry Lab": "Practical experiments in chemical processes",
        "Programming Lab": "Hands-on programming exercises and projects",

        // Semester 2
        "Mathematics - II":
            "Advanced calculus, complex analysis and transform techniques",
        "Basic Electronics Engineering":
            "Introduction to electronic components and circuits",
        "Data Structures and Algorithms":
            "Study of data organization, storage, and retrieval methods",
        "Digital Logic Design": "Design of digital circuits and systems",
        "Engineering Mechanics":
            "Study of forces and their effects on rigid bodies",
        "Communication Skills":
            "Effective writing, speaking, and presentation techniques",
        "Data Structures Lab": "Implementation of various data structures",
        "Electronics Lab": "Experiments with electronic circuits and devices",
        "Workshop Practice":
            "Hands-on experience with machining and fabrication",

        // Semester 3
        "Mathematics - III": "Probability, statistics, and numerical methods",
        "Object Oriented Programming":
            "Programming using object-oriented principles and patterns",
        "Computer Organization and Architecture":
            "Study of computer hardware and instruction sets",
        "Discrete Mathematics":
            "Logic, set theory, and graph theory for computing",
        "Operating Systems":
            "Study of process management, memory allocation, and file systems",
        "Design and Analysis of Algorithms":
            "Techniques for designing and analyzing algorithm efficiency",
        "Object Oriented Programming Lab":
            "Implementation of OOP concepts in practical applications",
        "Operating Systems Lab":
            "Hands-on exercises in OS concepts and system programming",
        "Algorithms Lab": "Implementation and analysis of various algorithms",

        // Semester 4
        "Theory of Computation":
            "Study of automata, formal languages, and computability",
        "Database Management Systems":
            "Design, implementation, and management of databases",
        "Software Engineering":
            "Methodologies and practices for software development",
        "Computer Networks":
            "Study of network architecture, protocols, and communication systems",
        "Microprocessors and Microcontrollers":
            "Architecture and programming of microprocessors",
        "DBMS Lab": "Database design, querying, and administration exercises",
        "Networks Lab":
            "Network configuration, protocol analysis, and security",
        "Software Engineering Lab":
            "Application of software engineering principles in projects",
        "Microprocessor Lab":
            "Programming and interfacing with microprocessors",

        // Semester 5
        "Artificial Intelligence":
            "Introduction to intelligent agent systems and problem solving",
        "Compiler Design":
            "Theory and implementation of programming language compilers",
        "Machine Learning":
            "Algorithms and statistical models for pattern recognition",
        "Cloud Computing":
            "Distributed computing resources and services over the internet",
        "Web Technologies":
            "Front-end and back-end technologies for web development",
        "Computer Graphics":
            "Principles and algorithms for rendering images on computers",
        "AI Lab": "Implementation of AI algorithms and intelligent systems",
        "Web Technologies Lab": "Development of web applications and services",
        "Computer Graphics Lab":
            "Implementation of graphics algorithms and visualization",

        // Semester 6
        "Big Data Analytics":
            "Processing and analyzing massive datasets for insights",
        "Cyber Security": "Protection of computer systems from theft or damage",
        "Internet of Things (IoT)":
            "Connecting everyday objects to the internet",
        "Blockchain Technology":
            "Distributed ledger technology and its applications",
        "Software Testing":
            "Techniques and tools for evaluating software quality",
        "Mobile Computing": "Development of applications for mobile devices",
        "Big Data Lab": "Implementation of big data tools and frameworks",
        "IoT Lab": "Building and programming IoT devices and systems",
        "Cyber Security Lab":
            "Security auditing, penetration testing, and threat analysis",

        // Semester 7
        "Deep Learning":
            "Neural networks and advanced machine learning techniques",
        "Natural Language Processing":
            "Computational methods for analyzing human language",
        "Augmented and Virtual Reality":
            "Technologies for enhancing or replacing reality",
        "Quantum Computing": "Computing using quantum-mechanical phenomena",
        "Data Science":
            "Extracting knowledge and insights from structured and unstructured data",
        "Deep Learning Lab":
            "Implementation of neural networks and deep learning models",
        "NLP Lab":
            "Building systems that understand and generate human language",
        "Elective - 1": "Specialized study in an area of computer science",

        // Semester 8
        "Capstone Project":
            "Culminating project demonstrating mastery of computer science concepts",
        "IT Ethics": "Ethical issues in information technology and computing",
        "IT Innovation and Entrepreneurship":
            "Creating new technology ventures and startups",
        "Industry Internship": "Practical work experience in an IT company",
        "Professional Development":
            "Career planning and professional skills for IT industry",
    };
    return descriptions[subject] || "Course description coming soon";
};

export { subjectIcons, getSubjectColor, getSubjectDescription };
