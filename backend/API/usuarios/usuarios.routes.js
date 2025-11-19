const express = require("express");
const router = express.Router();
const db = require("../../archivos/db");
const bcrypt = require("bcrypt");
const { compararPassword, generarToken } = require("@damianegreco/hashpass");
const { TOKEN_SECRET } = process.env;

const auth = require("../../archivos/middleware");

// Crear usuario
router.post("/", async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        await db.execute(
            "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
            [nombre, email, hashed, rol || "cliente"]
        );

        res.json({ mensaje: "Usuario creado" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const [rows] = await db.execute(
        "SELECT * FROM usuarios WHERE email = ? LIMIT 1",
        [email]
    );

    if (rows.length === 0) return res.status(404).json({ mensaje: "No existe" });

    const user = rows[0];

    const ok = await compararPassword(password, user.password);
    if (!ok) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = generarToken(
        {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        },
        TOKEN_SECRET,
        "1h"
    );

    res.json({ mensaje: "Login OK", token });
});

module.exports = router;
