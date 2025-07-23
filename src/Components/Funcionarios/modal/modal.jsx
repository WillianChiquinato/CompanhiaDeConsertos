import "./modal.css";
import { useState, useEffect } from "react";

export default function ModalFuncionarios({
  isOpen,
  onClose,
  onCreateFuncionario,
}) {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cep: "",
    salario: "",
    imagem: null,
    //Adicionais é uma lista
    adicionais: [],
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
    }));
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let newValue = value;

    if (name === "cpf" || name === "cep" || name === "salario" || name === "valorAdicional") {
      newValue = value.replace(/\D/g, ""); // remove tudo que não é número
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);

    const novoFuncionario = {
      NomeFuncionario: formData.nome,
      SalarioFuncionario: parseFloat(formData.salario),
      Imagem: formData.imagem ? formData.imagem.name : "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await onCreateFuncionario(novoFuncionario);
      onClose();
      setFormData({
        id: "",
        nome: "",
        cep: "",
        salario: "",
        imagem: null,
        //Adicionais é uma lista
        adicionais: [],
      });
    } catch (error) {
      console.error("Erro ao criar o funcionário:", error);
    }
  };

  const handleAddAdicional = () => {
    const adicionalSelect = document.querySelector("#adicionais");
    const valorAdicionalInput = document.querySelector(
      "input[name='valorAdicional']"
    );

    const novoAdicional = {
      nome: adicionalSelect.value,
      valor: parseFloat(valorAdicionalInput.value) || 0,
    };

    setFormData((prev) => ({
      ...prev,
      adicionais: [...prev.adicionais, novoAdicional],
    }));

    adicionalSelect.value = "";
    valorAdicionalInput.value = "";
  };

  return (
    <>
      <div
        id="fade"
        className={`modal-fade ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />
      <div id="modal" className={`modal-container ${isOpen ? "show" : ""}`}>
        <div className="modal-Header">
          <h2 id="modal-title">Funcionários</h2>
          <button id="fechar-modal" className="button" onClick={onClose}>
            Sair
          </button>
        </div>

        <form className="FormularioContainer" onSubmit={handleSubmit}>
          <label>Nome Colaborador</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome do colaborador..."
            value={formData.nome}
            onChange={handleChange}
          />

          <label>CPF</label>
          {/* so aceita numeros */}
          <input
            type="text"
            name="cpf"
            placeholder="Digite o CPF do colaborador..."
            value={formData.cpf}
            onChange={handleChange}
            maxLength={11}
          />

          <label>CEP - Endereço</label>
          <input
            type="text"
            name="cep"
            placeholder="Digite o CEP do colaborador..."
            value={formData.cep}
            onChange={handleChange}
            maxLength={8}
          />

          <label>Salário</label>
          <input
            type="text"
            name="salario"
            placeholder="Digite o salário do colaborador..."
            value={formData.salario}
            onChange={handleChange}
          />

          <label>Imagem</label>
          <input type="file" name="imagem" onChange={handleChange} />

          <div className="AdicionaisContainer">
            <div className="AdicionaisContent">
              <label>Adicionais</label>
              <select name="adicionais" id="adicionais">
                <option value="">Selecione um adicional</option>
                <option value="Convênio Medico">Convênio Medico</option>
                <option value="Vale PIX">Vale PIX</option>
                <option value="Bonificação">Bonificação</option>
                <option value="Odontologico">Odontologico</option>
                <option value="Vale Alimentação">Vale Alimentação</option>
              </select>
            </div>

            <div className="AdicionaisContent">
              <label>Valor Adicional</label>
              <input
                type="text"
                name="valorAdicional"
                placeholder="Digite o valor do adicional..."
                value={formData.valorAdicional}
                onChange={handleChange}
              />
            </div>

            <div className="AdicionaisContent">
              <button
                type="button"
                className="buttonAdicional"
                onClick={handleAddAdicional}
              >
                Add
              </button>
            </div>
          </div>

          <label>Lista de Adicionais</label>
          <ul className="adicionais-list">
            {formData.adicionais.map((adicional, index) => (
              <li key={index}>{adicional}</li>
            ))}
          </ul>

          <label>Descrição</label>
          <textarea
            name="descricao"
            placeholder="Digite o resumo da obra..."
            value={formData.descricao}
            onChange={handleChange}
          />

          <div className="modal-button">
            <button type="submit" className="enviar-button">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
