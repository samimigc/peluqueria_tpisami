// ---------------------------------------------------------
// 🌐 CONFIGURACIÓN BASE DEL SERVIDOR
// ---------------------------------------------------------
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");

// JWT de la librería hashpass
const { compararPassword, generarToken } = require("@damianegreco/hashpass");
const { TOKEN_SECRET } = process.env;

// Middleware (igual al del profe)
const auth = require("./middleware");

// Crear servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// 📌 REGISTRO DE USUARIO
// ---------------------------------------------------------
app.post("/usuarios", async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: "Email y contraseña son obligatorios." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
            [nombre, email, hashedPassword, rol || "cliente"]
        );

        res.status(201).json({ mensaje: "Usuario creado exitosamente." });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ mensaje: "El email ya está registrado." });
        }

        console.error(error);
        res.status(500).json({ mensaje: "Error interno al registrar usuario." });
    }
});

// ---------------------------------------------------------
// 📌 LOGIN (Genera token con hashpass)
// ---------------------------------------------------------
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: "Email y contraseña obligatorios." });
    }

    try {
        // Buscar usuario
        const [rows] = await db.execute(
            "SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ? LIMIT 1",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado." });
        }

        const user = rows[0];

        // Verificar contraseña
        const passwordCorrecta = await compararPassword(password, user.password);
        if (!passwordCorrecta) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta." });
        }

        // Info que va dentro del token
        const userData = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
        };

        // Generar token
        const token = generarToken(userData, TOKEN_SECRET, "1h");

        res.json({
            mensaje: "Login exitoso",
            usuario: userData,
            token: token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno en el login." });
    }
});

// ---------------------------------------------------------
// 📌 RUTA PROTEGIDA: OBTENER TURNOS (solo usuarios logueados)
// ---------------------------------------------------------
app.get("/turnos", auth, async (req, res) => {
    try {
        const [resultados] = await db.execute("SELECT * FROM turnos");
        res.json(resultados);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener turnos." });
    }
});

// ---------------------------------------------------------
// 📌 RUTA PROTEGIDA: CREAR TURNO (solo ADMIN)
// ---------------------------------------------------------
app.post("/turnos", auth, async (req, res) => {

    // VERIFICAR ROL
    if (req.user.rol !== "admin") {
        return res.status(403).json({ mensaje: "No tenés permisos (solo admins)." });
    }

    const { cliente, servicio, hora, fecha } = req.body;

    try {
        await db.execute(
            "INSERT INTO turnos (cliente, servicio, hora, fecha) VALUES (?, ?, ?, ?)",
            [cliente, servicio, hora, fecha]
        );

        res.status(201).json({ mensaje: "Turno creado correctamente." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear turno." });
    }
});

// ---------------------------------------------------------
// 📌 HOME
// ---------------------------------------------------------
app.get("/", (req, res) => {
    res.send("Backend funcionando 🚀");
});

// ---------------------------------------------------------
// 🚀 INICIO DEL SERVIDOR
// ---------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
