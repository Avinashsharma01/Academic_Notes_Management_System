import {
    FaBook,
    FaGraduationCap,
    FaLaptopCode,
    FaToolbox,
} from "react-icons/fa";

// Mock courses data that would normally come from an API
export const getMockCoursesData = () => {
    return [
        {
            name: "B-TECH",
            route: "b.tech",
            icon: <FaLaptopCode size={36} />,
            description: "Bachelor of Technology",
            color: "from-blue-500 to-blue-600",
            subjects: 42,
            years: 4,
        },
        {
            name: "BCA",
            route: "bca",
            icon: <FaBook size={36} />,
            description: "Bachelor of Computer Applications",
            color: "from-purple-500 to-purple-600",
            subjects: 36,
            years: 3,
        },
        {
            name: "MCA",
            route: "mca",
            icon: <FaGraduationCap size={36} />,
            description: "Master of Computer Applications",
            color: "from-emerald-500 to-emerald-600",
            subjects: 24,
            years: 2,
        },
        {
            name: "DIPLOMA",
            route: "diploma",
            icon: <FaToolbox size={36} />,
            description: "Technical Diploma",
            color: "from-amber-500 to-amber-600",
            subjects: 30,
            years: 3,
        },
        // Add more courses as needed
    ];
};
