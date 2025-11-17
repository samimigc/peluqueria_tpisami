import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inicio.css";

export default function Inicio() {
  const [turnos, setTurnos] = useState([]);
  const [formData, setFormData] = useState({
    cliente: "",
    servicio: "",
    hora: "",
    fecha: "",
  });

  // Cargar turnos desde MySQL
  useEffect(() => {
    axios.get("http://localhost:5000/turnos")
      .then((res) => setTurnos(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/turnos", formData)
      .then(() => {
        alert("Turno guardado 💇‍♀️");
        setFormData({ cliente: "", servicio: "", hora: "", fecha: "" });

        // Recargar lista
        axios.get("http://localhost:5000/turnos")
          .then((res) => setTurnos(res.data));
      })
      .catch((err) => console.error(err));
  };

  // Manejar cambios
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Eliminar turno
  const eliminarTurno = (id) => {
    if (window.confirm("¿Eliminar este turno?")) {
      axios.delete(`http://localhost:5000/turnos/${id}`)
        .then(() => {
          setTurnos(turnos.filter((t) => t.id !== id));
        })
        .catch((err) => console.error(err));
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
              <strong>{t.cliente}</strong> — {t.servicio}
              <br />
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
