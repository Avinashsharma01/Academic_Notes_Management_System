import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./Components/Navbaar/Navbar";
import ProtectedUserRoute from "./Config/ProtectedUserRoute";
import ProtectedAdminRoute from "./Config/ProtectedAdminRoute";
import ProtectedSuperAdminRoute from "./Config/ProtectedSuperAdminRoute";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";

// Lazy load components
const Home = lazy(() => import("./Pages/Home"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));
const Dashboard = lazy(() => import("./Sessions/Dashboard"));
const Courses = lazy(() => import("./Courses/Courses"));
const About = lazy(() => import("./Pages/About"));
const Feedback = lazy(() => import("./Pages/Feedback"));
const Services = lazy(() => import("./Pages/Services"));
const Contact = lazy(() => import("./Pages/Contact"));
const AdminSignUp = lazy(() => import("./Pages/AdminPages/AdminSignUp"));
const AdminLogin = lazy(() => import("./Pages/AdminPages/AdminLogin"));
const Branches = lazy(() => import("./Branches/Branches"));
const Semester = lazy(() => import("./Semesters/Semester"));
const Subjects = lazy(() => import("./Subject/Subjects"));
const UploadNote = lazy(() =>
    import("./Pages/AdminPages/NoteUpload/UploadNote")
);
const NotesList = lazy(() => import("./Notes/NotesList"));
const AdminDashboard = lazy(() => import("./Pages/AdminPages/AdminDashboard"));
const ManageNotes = lazy(() => import("./Pages/AdminPages/ManageNotes"));
const AllFeedbacks = lazy(() => import("./Pages/AdminPages/AllFeedbacks"));
const UserProfile = lazy(() => import("./Pages/UserProfile"));
const AdminProfile = lazy(() => import("./Pages/AdminPages/AdminProfile"));
const Events = lazy(() => import("./Pages/Events"));
const AllUser = lazy(() => import("./Pages/AdminPages/AllUsers"));

// SuperAdmin pages
const SuperAdminLogin = lazy(() => import("./Pages/SuperAdminPages/SuperAdminLogin"));
const SuperAdminDashboard = lazy(() => import("./Pages/SuperAdminPages/SuperAdminDashboard"));
const AcademicManagement = lazy(() => import("./Pages/SuperAdminPages/AcademicManagement"));

// Loading component
const Loading = () => (
    <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
);

function App() {
    const sampleEvent = {
        title: "React Conference 2025",
        date: "March 10, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "San Francisco, CA",
        description:
            "Join us for an exciting day of React talks and networking!",
    };
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/adminsignup" element={<AdminSignUp />} />
                    <Route path="/adminLogin" element={<AdminLogin />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/service" element={<Services />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route
                        path="/events"
                        element={<Events event={sampleEvent} />}
                    />

                    {/* SuperAdmin public route */}
                    <Route path="/superadmin/login" element={<SuperAdminLogin />} />

                    {/* Protected User Routes */}
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/courses" element={<Courses />} />
                    </Route>
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/branch" element={<Branches />} />
                    </Route>
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/semester" element={<Semester />} />
                    </Route>
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/subjects" element={<Subjects />} />
                    </Route>
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/notes" element={<NotesList />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route element={<ProtectedAdminRoute />}>
                        <Route
                            path="/admin/admindashboard"
                            element={<AdminDashboard />}
                        />
                    </Route>
                    <Route element={<ProtectedAdminRoute />}>
                        <Route
                            path="/admin/uploadnotes"
                            element={<UploadNote />}
                        />
                    </Route>
                    <Route element={<ProtectedAdminRoute />}>
                        <Route
                            path="/admin/managenotes"
                            element={<ManageNotes />}
                        />
                    </Route>
                    <Route element={<ProtectedAdminRoute />}>
                        <Route path="/admin/allUser" element={<AllUser />} />
                    </Route>

                    <Route element={<ProtectedSuperAdminRoute />}>
                        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
                        <Route path="/superadmin/academic" element={<AcademicManagement />} />
                        <Route path="/superadmin/feedback" element={<AllFeedbacks />} />
                    </Route>

                    {/* User and Admin Profile */}
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/userprofile" element={<UserProfile />} />
                    </Route>
                    <Route element={<ProtectedAdminRoute />}>
                        <Route
                            path="/adminprofile"
                            element={<AdminProfile />}
                        />
                    </Route>
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
}

export default App;
