import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadNotes from "./pages/UploadNotes";
import NotesList from "./pages/NotesList";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                /> */}
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <UploadNotes />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <NotesList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
