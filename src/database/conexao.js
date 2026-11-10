const Database = require("better-sqlite3");
const path = require("path");

const caminhoBanco = path.join(__dirname, "../../alunos.db");
const db = new Database(caminhoBanco);

db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        matricula TEXT NOT NULL UNIQUE,
        curso TEXT NOT NULL
    )
`);

module.exports = db;
