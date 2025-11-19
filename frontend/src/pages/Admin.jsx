import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL_BASE = 'http://localhost:5000';

const Admin = () => {
  const [turnos, setTurnos] = useState([]);

  const obtenerTurnos = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/turnos`);
      setTurnos(response.data);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  return (
    <div>
      <h1>Panel Admin — Turnos</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Hora</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {turnos.map((t) => (
            <tr key={t.id}>
              <td>{t.cliente}</td>
              <td>{t.servicio}</td>
              <td>{t.hora}</td>
              <td>{t.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
