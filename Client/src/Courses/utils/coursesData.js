/**
 * Returns mock course data for development and testing
 */
export const getMockCoursesData = () => {
    return [
        {
            id: "btech",
            name: "B.Tech",
            description: "Bachelor of Technology",
            route: "btech",
            icon: "graduation-cap",
            color: "blue",
            departments: 6,
            students: 1200
        },
        {
            id: "mtech",
            name: "M.Tech",
            description: "Master of Technology",
            route: "mtech",
            icon: "book",
            color: "indigo",
            departments: 4,
            students: 450
        },
        {
            id: "bca",
            name: "BCA",
            description: "Bachelor of Computer Applications",
            route: "bca",
            icon: "book",
            color: "indigo",
            departments: 1,
            students: 450
        },
        {
            id: "mca",
            name: "MCA",
            description: "Master of Computer Applications",
            route: "mca",
            icon: "book",
            color: "indigo",
            departments: 1,
            students: 450
        },
        {
            id: "bsc",
            name: "B.Sc",
            description: "Bachelor of Science",
            route: "bsc",
            icon: "flask",
            color: "green",
            departments: 3,
            students: 800
        },
        {
            id: "msc",
            name: "M.Sc",
            description: "Master of Science",
            route: "msc",
            icon: "microscope",
            color: "teal",
            departments: 3,
            students: 300
        },
        {
            id: "bba",
            name: "BBA",
            description: "Bachelor of Business Administration",
            route: "bba",
            icon: "briefcase",
            color: "yellow",
            departments: 2,
            students: 600
        },
        {
            id: "mba",
            name: "MBA",
            description: "Master of Business Administration",
            route: "mba",
            icon: "chart-line",
            color: "orange",
            departments: 2,
            students: 350
        }
    ];
};