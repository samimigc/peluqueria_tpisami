const mysql = require('mysql2/promise'); // npm install mysql2

// Las variables de entorno son leídas por un paquete como 'dotenv'
// si no lo estás usando, asegúrate de que 'Servidor.js' lo carga primero.
const {DBNAME, DBUSER, DBPASS, DBHOST} = process.env;

const db = mysql.createPool({
  host: DBHOST,
  user: DBUSER,
  database: DBNAME,
  password: DBPASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = db;