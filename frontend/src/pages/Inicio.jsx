import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inicio.css";

const URL_BASE = "http://localhost:5000";

export default function Inicio() {
  const [turnos, setTurnos] = useState([]);
  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    hora: "",
    fecha: "",
  });

  // Cargar turnos desde el backend
  const obtenerTurnos = async () => {
    try {
      const res = await axios.get(`${URL_BASE}/turnos`);
      setTurnos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar turno
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL_BASE}/turnos`, formData);
      alert("Turno guardado 💇‍♀️");
      setFormData({ cliente: "", servicio: "", hora: "", fecha: "" });
      obtenerTurnos(); // Recargar
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar turno
  const eliminarTurno = async (id) => {
    if (!window.confirm("¿Eliminar este turno?")) return;
    try {
      await axios.delete(`${URL_BASE}/turnos/${id}`);
      setTurnos(turnos.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="inicio-container">
      <header className="inicio-header">
        <h1>💇‍♀️ HairTime</h1>
        <p>Gestión de turnos</p>
      </header>

      <section className="formulario-turno">
        <h2>Reservar turno</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="cliente"
            placeholder="Cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="servicio"
            placeholder="Servicio"
            value={formData.servicio}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />

          <button type="submit">Reservar</button>
        </form>
      </section>

      <section className="turnos-lista">
        <h2>Turnos registrados</h2>

        <ul>
          {turnos.map((t) => (
            <li key={t.id}>
              <strong>{t.cliente}</strong> — {t.servicio} <br />
              🕑 {t.hora} — 📅 {t.fecha}
              <br />
              <button onClick={() => eliminarTurno(t.id)}>🗑️ Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
