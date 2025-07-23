export class AdicionaisFuncionario {
  constructor({
    id,
    nome,
    valor,
    fk_Funcionario,
    createAt,
    updateAt,
  }) {
    this.id = id;
    this.nomeAdicional = nome;
    this.valor = valor;
    this.tipoAdicional = fk_Funcionario;
    this.createAt = createAt;
    this.UpdateAt = updateAt;
  }
}