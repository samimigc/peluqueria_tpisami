import React from "react";
import Navbar from "../components/Navbar";
import "./Admin.css";

export default function Admin() {
  const turnos = [
    { id: 1, cliente: "Lucía", servicio: "Corte", hora: "10:00", dia: "Lunes" },
    { id: 2, cliente: "Carla", servicio: "Coloración", hora: "14:30", dia: "Martes" },
    { id: 3, cliente: "Sofía", servicio: "Peinado", hora: "16:00", dia: "Jueves" },
  ];

  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-panel">
        <h2>Panel de Administración</h2>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Hora</th>
              <th>Día</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id}>
                <td>{t.cliente}</td>
                <td>{t.servicio}</td>
                <td>{t.hora}</td>
                <td>{t.dia}</td>
                <td>
                  <button className="editar">Editar</button>
                  <button className="eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
