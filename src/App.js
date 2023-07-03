import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"This is amazing react course"} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route />
              <Route path="/About" element={<About />} />
              <Route />
              <Route path="/Login" element={<Login />} />
              <Route />
              <Route path="/Signup" element={<Signup />} />
              <Route />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
