const DAOSqlite = require("./dao/DAOSqlite");

const alunoDAO = new DAOSqlite();

function main() {
    const alunos = alunoDAO.buscarTodos();

    if (alunos.length === 0) {
        console.log("Nenhum aluno cadastrado.");
        return;
    }

    console.table(alunos);
}

main();
