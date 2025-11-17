
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <nav style={{ backgroundColor: "#d16ba5", padding: "10px" }}>
        <Link to="/" style={{ margin: "10px", color: "white" }}>Login</Link>
        <Link to="/inicio" style={{ margin: "10px", color: "white" }}>Inicio</Link>
        <Link to="/admin" style={{ margin: "10px", color: "white" }}>Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
