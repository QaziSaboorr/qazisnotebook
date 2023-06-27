import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route />
              <Route path="/About" element={<About />} />
              <Route />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
