import funcionarioPadrao from "../Components/Funcionarios/assets/FuncionarioPadrao.png";

export class Funcionario {
  constructor({
    id,
    nome,
    salario,
    imagem,
    createAt,
    updateAt,
  }) {
    this.id = id;
    this.nomeFuncionario = nome;
    this.salario = salario;
    this.imagem = imagem;
    this.createAt = createAt;
    this.UpdateAt = updateAt;
  }

  // Método que atribui um valor padrao para a imagem
  setImagemPadrao() {
    this.imagem = funcionarioPadrao;
  }
}
