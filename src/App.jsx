import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Auth/Login";
import Registr from "./Pages/Auth/Registr";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reg" element={<Registr />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
