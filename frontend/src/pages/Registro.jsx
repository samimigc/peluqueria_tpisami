// frontend/src/pages/Registro.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Para redirigir al Login

// Asegúrate de que este puerto coincida con tu Servidor.js
const URL_BASE = "http://localhost:5000";

export default function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
    });

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envía los datos al backend para crear el usuario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${URL_BASE}/usuarios`, formData);
            
            // Si la respuesta es exitosa (código 201)
            alert(res.data.mensaje); 
            
            // Redirige al usuario a la página de Login o Inicio
            navigate('/login'); 

        } catch (err) {
            console.error("Error de registro:", err.response ? err.response.data : err);
            
            // Muestra el mensaje de error del servidor (ej: email duplicado)
            if (err.response && err.response.data && err.response.data.mensaje) {
                 alert("Error: " + err.response.data.mensaje);
            } else {
                 alert("Ocurrió un error al intentar registrarse.");
            }
        }
    };

    return (
        <div className="registro-container">
            <h2>Crear cuenta (Cliente)</h2>
            <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre Completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">Registrarse</button>
            </form>
            <p>
                ¿Ya tienes cuenta? <a href="/login">Iniciar Sesión</a>
            </p>
        </div>
    );
}