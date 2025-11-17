import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">💇‍♀️ Aurahair</div>
      <ul className="navbar-links">
        <li><Link to="/inicio">Inicio</Link></li>
        <br />
        <li><Link to="/admin">Administrar</Link></li>
        <br />
        <li><Link to="/">Cerrar sesión</Link></li>
        <br />
      </ul>
    </nav>
  );
}
