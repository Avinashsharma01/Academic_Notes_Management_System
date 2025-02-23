import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Extract query parameters
    const course = queryParams.get("course");
    const branch = queryParams.get("branch");
    const semester = queryParams.get("semester");

    // Define the breadcrumb hierarchy based on the current pathname and query parameters
    const getBreadcrumbSegments = () => {
        const segments = [{ path: "/", label: "Home" }];

        if (location.pathname.startsWith("/dashboard")) {
            segments.push({ path: "/dashboard", label: "Dashboard" });
        }

        if (location.pathname.startsWith("/courses")) {
            segments.push(
                { path: "/dashboard", label: "Dashboard" },
                { path: "/courses", label: "Courses" }
            );
        }

        if (location.pathname.startsWith("/branch")) {
            segments.push(
                { path: "/dashboard", label: "Dashboard" },
                { path: "/courses", label: "Courses" },
                { path: `/branch?course=${course}`, label: course || "Course" }
            );
        }

        if (location.pathname.startsWith("/semester")) {
            segments.push(
                { path: "/dashboard", label: "Dashboard" },
                { path: "/courses", label: "Courses" },
                { path: `/branch?course=${course}`, label: course || "Course" },
                {
                    path: `/semester?course=${course}&branch=${branch}`,
                    label: branch || "Branch",
                }
            );
        }

        if (location.pathname.startsWith("/subjects")) {
            segments.push(
                { path: "/dashboard", label: "Dashboard" },
                { path: "/courses", label: "Courses" },
                { path: `/branch?course=${course}`, label: course || "Course" },
                {
                    path: `/semester?course=${course}&branch=${branch}`,
                    label: branch || "Branch",
                },
                {
                    path: `/subjects?course=${course}&branch=${branch}&semester=${semester}`,
                    label: semester ? `Semester ${semester}` : "Semester",
                }
            );
        }

        return segments;
    };

    const breadcrumbSegments = getBreadcrumbSegments();

    return (
        <nav className="flex items-center text-sm text-gray-400 mb-6 justify-center max-sm:overflow-x-scroll  ">
            {breadcrumbSegments.map((segment, index) => (
                <span key={index}>
                    {index > 0 && <span className="mx-2">/</span>}
                    {index === breadcrumbSegments.length - 1 ? (
                        <span className="text-white">{segment.label}</span>
                    ) : (
                        <Link to={segment.path} className="hover:text-white">
                            {segment.label}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
