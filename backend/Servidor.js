const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔌 Conexión a MySQL
const conexion = mysql.createConnection({
  host: "162.241.60.178",
  port: 3306,
  user: "gutierrezs",
  password: "47588978",
  database: "25_72_gutierrezs"
});

conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL correctamente!");
  }
});

// 📌 ====================
//      RUTAS CRUD
// ====================

// 📌 GET - Obtener todos los turnos
app.get("/turnos", (req, res) => {
  conexion.query("SELECT * FROM turnos", (err, resultados) => {
    if (err) return res.status(500).json(err);
    res.json(resultados);
  });
});

// 📌 POST - Crear un turno
app.post("/turnos", (req, res) => {
  const { cliente, servicio, hora, fecha } = req.body;

  conexion.query(
    "INSERT INTO turnos (cliente, servicio, hora, fecha) VALUES (?, ?, ?, ?)",
    [cliente, servicio, hora, fecha],
    (err, resultado) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ mensaje: "Turno creado correctamente 💇‍♀️" });
    }
  );
});

// 📌 PUT - Actualizar turno
app.put("/turnos/:id", (req, res) => {
  const id = req.params.id;
  const { servicio, hora, fecha } = req.body;

  conexion.query(
    "UPDATE turnos SET servicio=?, hora=?, fecha=? WHERE id=?",
    [servicio, hora, fecha, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Turno actualizado correctamente ✂️" });
    }
  );
});

// 📌 DELETE - Borrar turno
app.delete("/turnos/:id", (req, res) => {
  const id = req.params.id;

  conexion.query("DELETE FROM turnos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: "Turno eliminado correctamente 🗑️" });
  });
});

// 📌 Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor backend con MySQL funcionando 💇‍♀️");
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
