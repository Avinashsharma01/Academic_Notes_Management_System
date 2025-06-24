import {
    FaCode,
    FaServer,
    FaRobot,
    FaBuilding,
    FaPlug,
    FaMicrochip,
    FaBolt,
    FaTshirt,
} from "react-icons/fa";

// Get icon based on branch code
export const getBranchIcon = (route) => {
    const icons = {
        it: <FaServer size={36} />,
        cse: <FaCode size={36} />,
        alml: <FaRobot size={36} />,
        civil: <FaBuilding size={36} />,
        eee: <FaPlug size={36} />,
        ece: <FaMicrochip size={36} />,
        ee: <FaBolt size={36} />,
        ft: <FaTshirt size={36} />,
    };
    return icons[route] || <FaCode size={36} />;
};

// Get color based on branch code
export const getBranchColor = (route) => {
    const colors = {
        it: "from-blue-500 to-blue-600",
        cse: "from-indigo-500 to-indigo-600",
        alml: "from-purple-500 to-purple-600",
        civil: "from-amber-500 to-amber-600",
        eee: "from-yellow-500 to-yellow-600",
        ece: "from-red-500 to-red-600",
        ee: "from-orange-500 to-orange-600",
        ft: "from-emerald-500 to-emerald-600",
    };
    return colors[route] || "from-blue-500 to-blue-600";
};

// Get branch description
export const getBranchDescription = (route) => {
    const descriptions = {
        it: "Information Technology",
        cse: "Computer Science & Engineering",
        alml: "Artificial Intelligence & Machine Learning",
        civil: "Civil Engineering",
        eee: "Electrical & Electronics Engineering",
        ece: "Electronics & Communication Engineering",
        ee: "Electrical Engineering",
        ft: "Fashion Technology",
    };
    return descriptions[route] || "";
};

// Mock data for branches
export const getMockBranchesData = () => {
    return [
        { name: "IT", route: "it" },
        { name: "CSE", route: "cse" },
        { name: "AI/ML", route: "alml" },
        { name: "CIVIL", route: "civil" },
        { name: "EEE", route: "eee" },
        { name: "ECE", route: "ece" },
        { name: "EE", route: "ee" },
        { name: "F.TECH", route: "ft" },
    ];
};
