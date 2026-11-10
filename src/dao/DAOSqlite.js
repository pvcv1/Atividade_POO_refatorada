const DAO = require("./DAO");
const Aluno = require("../models/Aluno");
const db = require("../database/conexao");

class DAOSqlite extends DAO {
    inserir(aluno) {
        const comando = db.prepare(`
            INSERT INTO alunos (nome, matricula, curso)
            VALUES (?, ?, ?)
        `);

        const resultado = comando.run(
            aluno.nome,
            aluno.matricula,
            aluno.curso
        );

        aluno.id = Number(resultado.lastInsertRowid);
        return aluno.id;
    }

    remover(aluno) {
        const id = typeof aluno === "object" ? aluno.id : aluno;

        const comando = db.prepare(
            "DELETE FROM alunos WHERE id = ?"
        );

        const resultado = comando.run(id);
        return resultado.changes > 0;
    }

    atualizar(aluno) {
        const comando = db.prepare(`
            UPDATE alunos
            SET nome = ?, matricula = ?, curso = ?
            WHERE id = ?
        `);

        const resultado = comando.run(
            aluno.nome,
            aluno.matricula,
            aluno.curso,
            aluno.id
        );

        return resultado.changes > 0;
    }

    buscarPorId(id) {
        const comando = db.prepare(
            "SELECT * FROM alunos WHERE id = ?"
        );

        const registro = comando.get(id);

        if (!registro) {
            return null;
        }

        return new Aluno(
            registro.nome,
            registro.matricula,
            registro.curso,
            registro.id
        );
    }

    buscarTodos() {
        const comando = db.prepare(
            "SELECT * FROM alunos ORDER BY id"
        );

        const registros = comando.all();

        return registros.map((registro) => new Aluno(
            registro.nome,
            registro.matricula,
            registro.curso,
            registro.id
        ));
    }
}

module.exports = DAOSqlite;
