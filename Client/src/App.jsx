import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import UploadNotes from "./Pages/AdminPages/UploadNotes";
import NotesList from "./pages/NotesList";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./Pages/About";
import Feedback from "./Pages/Feedback";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import AdminSignUp from "./Pages/AdminPages/AdminSignUp";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import Footer from "./Components/Footer";

function App() {
    return (
        <Router>
            <Navbar />
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
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/upload" element={<UploadNotes />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/notes" element={<NotesList />} />
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
