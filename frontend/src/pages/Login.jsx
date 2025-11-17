import React from "react";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">💇‍♀️ Aurahair</h1>
        <h2>Bienvenida</h2>
        <p className="sub">Iniciá sesión para gestionar tus turnos</p>
        <form>
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
        </form>
        <p className="footer">© 2025 Aurahair. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
