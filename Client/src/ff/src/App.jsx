import "./App.css";
import Container from "./Components/Container";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import FeedBack from "./pages/FeedBack";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CSE from "./pages/CSE";
import IT from "./pages/IT";
function App() {
  return (
 
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About/>} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/FeedBack" element={<FeedBack />} />
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignOut" element={<SignOut/>} />
        <Route path="/cse" element={<CSE/>} />
        <Route path="/it" element={<IT/>} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
