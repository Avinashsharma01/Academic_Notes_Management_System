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
// import Breadcrumb from "./Components/Breadcrumb";
function App() {
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
                {/* Protected Routes */}
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
                <Route element={<ProtectedAdminRoute />}>
                    <Route path="/uploadnotes" element={<UploadNote />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

{
    /* <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/> */
}
