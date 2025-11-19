// ---------------------------------------------
// 📌 LOGIN (Autenticación con hashpass + tokens)
// ---------------------------------------------
const { compararPassword, generarToken } = require("@damianegreco/hashpass");
const { TOKEN_SECRET } = process.env;

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: "Email y contraseña son obligatorios." });
    }

    try {
        // 1️⃣ Buscar usuario en la base de datos
        const [rows] = await db.execute(
            "SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ? LIMIT 1",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "El usuario no existe." });
        }

        const user = rows[0];

        // 2️⃣ Comparar contraseña ingresada con la guardada
        const passwordCorrecta = await compararPassword(password, user.password);

        if (!passwordCorrecta) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta." });
        }

        // 3️⃣ Datos que irán dentro del token
        const userData = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        };

        // 4️⃣ Generar token (expira en 1h)
        const token = generarToken(userData, TOKEN_SECRET, "1h");

        // 5️⃣ Respuesta final
        res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: userData,
            token: token
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});
