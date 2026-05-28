// This file contains the data for dropdown options in the UploadNote form

// Session mapping based on year
export const DynamicSession = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
];

// Semester mapping based on course
export const DynamicSemester = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
];

// Course mapping based on session
export const DynamicCourse = ["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "M.Sc"];

// Branch mapping based on Course
export const DynamicBranch = [
    "CSE",
    "IT",
    "Mechanical",
    "Civil",
    "ECE",
    "FT",
    "EEE",
    "AI/ML",
    "AEROSPACE",
];

// Subjects mapping based on branch and semester
export const subjectsByBranchAndSemester = {
    CSE: {
        "1st": [
            "Engineering Mathematics",
            "Engineering Physics",
            "Engineering Chemistry",
            "Basic Electrical Engineering",
            "Engineering Mechanics",
            "Engineering Drawing",
        ],
        "2nd": [
            "Advanced Mathematics",
            "Data Structures",
            "Digital Electronics",
            "Computer Organization",
            "Programming Fundamentals",
        ],
        "3rd": [
            "Object Oriented Programming",
            "Database Management Systems",
            "Computer Networks",
            "Operating Systems",
            "Theory of Computation",
        ],
        "4th": [
            "Software Engineering",
            "Compiler Design",
            "Computer Architecture",
            "Microprocessors",
            "System Programming",
        ],
        "5th": [
            "Machine Learning",
            "Cloud Computing",
            "Blockchain Technology",
            "Web Development",
            "Mobile Computing",
        ],
        "6th": [
            "Deep Learning",
            "Big Data Analytics",
            "Cyber Security",
            "Internet of Things",
            "Distributed Systems",
        ],
        "7th": [
            "Artificial Intelligence",
            "Natural Language Processing",
            "Computer Vision",
            "Robotics",
            "Advanced Database Systems",
        ],
        "8th": [
            "Project Management",
            "Advanced Topics in AI",
            "Advanced Topics in ML",
            "Advanced Topics in Security",
            "Advanced Topics in Networks",
        ],
    },
    IT: {
        "1st": [
            "Mathematics - I,",
            "Physics",
            "Chemistry",
            "Programming for Problem Solving",
            "Basic Electrical Engineering",
            "Engineering Graphics",
            "Environmental Science",
            "Physics Lab",
            "Chemistry Lab",
            "Programming Lab"
        ],
        "2nd": [
            "Mathematics - II",
            "Basic Electronics Engineering",
            "Data Structures and Algorithms",
            "Digital Logic Design",
            "Engineering Mechanics",
            "Communication Skills",
            "Data Structures Lab",
            "Electronics Lab",
            "Workshop Practice"
        ],
        "3rd": [
            "Mathematics - III",
            "Object Oriented Programming",
            "Computer Organization and Architecture",
            "Discrete Mathematics",
            "Operating Systems",
            "Design and Analysis of Algorithms",
            "Object Oriented Programming Lab",
            "Operating Systems Lab",
            "Algorithms Lab"
        ],
        "4th": [
            "Theory of Computation",
            "Database Management Systems",
            "Software Engineering",
            "Computer Networks",
            "Microprocessors and Microcontrollers",
            "DBMS Lab",
            "Networks Lab",
            "Software Engineering Lab",
            "Microprocessor Lab"
        ],
        "5th": [
            "Artificial Intelligence",
            "Compiler Design",
            "Machine Learning",
            "Cloud Computing",
            "Web Technologies",
            "Computer Graphics",
            "AI Lab",
            "Web Technologies Lab",
            "Computer Graphics Lab"
        ],
        "6th": [
            "Big Data Analytics",
            "Cyber Security",
            "Internet of Things (IoT)",
            "Blockchain Technology",
            "Software Testing",
            "Mobile Computing",
            "Big Data Lab",
            "IoT Lab",
            "Cyber Security Lab"
        ],
        "7th": [
            "Deep Learning",
            "Natural Language Processing",
            "Augmented and Virtual Reality",
            "Quantum Computing",
            "Data Science",
            "Deep Learning Lab",
            "NLP Lab",
            "Elective - 1"
        ],
        "8th": [
            "Capstone Project",
            "IT Ethics",
            "IT Innovation and Entrepreneurship",
            "Industry Internship",
            "Professional Development",
        ],
    },
};