const { verificarToken } = require('@damianegreco/hashpass');
const { TOKEN_SECRET } = process.env;

// Middleware para verificar token
function middleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ mensaje: "No se envió token." });
  }

  // El token viene en formato "Bearer 123123"
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Token inválido." });
  }

  const verificacion = verificarToken(token, TOKEN_SECRET);

  if (verificacion?.data) {
    req.user = verificacion.data; // EL USUARIO QUE GENERÓ EL TOKEN
    next();
  } else {
    res.status(401).json({ mensaje: "Sin autorización." });
  }
}

module.exports = middleware;
