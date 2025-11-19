const express = require("express");
const router = express.Router();
const db = require("../../archivos/db");
const auth = require("../../archivos/middleware");

// Obtener turnos (logueado)
router.get("/", auth, async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM turnos");
    res.json(rows);
});

// Crear turno (solo admin)
router.post("/", auth, async (req, res) => {
    if (req.user.rol !== "admin")
        return res.status(403).json({ mensaje: "Solo admin" });

    const { cliente, servicio, hora, fecha } = req.body;

    await db.execute(
        "INSERT INTO turnos (cliente, servicio, hora, fecha) VALUES (?, ?, ?, ?)",
        [cliente, servicio, hora, fecha]
    );

    res.json({ mensaje: "Turno creado" });
});

module.exports = router;
