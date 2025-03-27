import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Sessions/Dashboard";
import Courses from "./Courses/Courses";
import ProtectedUserRoute from "./Config/ProtectedUserRoute";
import About from "./Pages/About";
import Feedback from "./Pages/Feedback";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import AdminSignUp from "./Pages/AdminPages/AdminSignUp";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import Footer from "./Components/Footer";
import Branches from "./Branches/Branches";
import Semester from "./Semesters/Semester";
import Subjects from "./Subject/Subjects";
import UploadNote from "./Pages/AdminPages/NoteUpload/UploadNote";
import ProtectedAdminRoute from "./Config/ProtectedAdminRoute";
import CSE from "./HomePage/pages/BranchPage/CSE";
import IT from "./HomePage/pages/BranchPage/IT";
import Machenical from "./HomePage/pages/BranchPage/MACHENICAL";
import EEE from "./HomePage/pages/BranchPage/EEE";
import ECE from "./HomePage/pages/BranchPage/ECE";
import CIVIL from "./HomePage/pages/BranchPage/Civil";
import NotesList from "./Notes/NotesList";
import AdminDashboard from "./Pages/AdminPages/AdminDashboard";
import ManageNotes from "./Pages/AdminPages/ManageNotes";
import AllFeedbacks from "./Pages/AdminPages/AllFeedbacks";
import UserProfile from "./Pages/UserProfile";
import AdminProfile from "./Pages/AdminPages/AdminProfile";
import Events from "./Pages/Events";
// import Breadcrumb from "./Components/Breadcrumb";
function App() {
    // Example usage:
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
            {/* <Breadcrumb /> */}
            <Routes>
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
                    <Route path="/admin/uploadnotes" element={<UploadNote />} />
                </Route>
                <Route element={<ProtectedAdminRoute />}>
                    <Route
                        path="/admin/managenotes"
                        element={<ManageNotes />}
                    />
                </Route>
                <Route element={<ProtectedAdminRoute />}>
                    <Route path="/admin/feedback" element={<AllFeedbacks />} />
                </Route>

                {/* Home Branch Page  || this is public page available for anyone */}
                <Route path="/CSE" element={<CSE />} />
                <Route path="/IT" element={<IT />} />
                <Route path="/MACHENICAL" element={<Machenical />} />
                <Route path="/ECE" element={<ECE />} />
                <Route path="/EEE" element={<EEE />} />
                <Route path="/CIVIL" element={<CIVIL />} />

                {/* User and Admin Profile */}
                <Route path="userprofile" element={<UserProfile />} />
                <Route path="adminprofile" element={<AdminProfile />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

/* <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/> */
