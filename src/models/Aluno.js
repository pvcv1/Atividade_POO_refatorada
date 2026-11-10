class Aluno {
    constructor(nome, matricula, curso, id = null) {
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
        this.curso = curso;
    }
}

module.exports = Aluno;
