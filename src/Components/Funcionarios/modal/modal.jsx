import { avatarOptionsFuncionarios } from "../../../data/avatars.jsx";
import { useState, useEffect } from "react";
import "./modal.css";

export default function ModalFuncionarios({
  isOpen,
  onClose,
  onCreateFuncionario,
  adicionaisController,
}) {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cpf: "",
    cep: "",
    salario: "",
    imagem: null,
    //Adicionais é uma lista
    adicionais: [],
    valorAdicional: "",
    adicionalSelecionado: "",
    descricao: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
    }));
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (
      name === "cpf" ||
      name === "cep" ||
      name === "salario" ||
      name === "valorAdicional"
    ) {
      newValue = value.replace(/\D/g, ""); // remove tudo que não é número
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoFuncionario = {
      Id_Funcionario: formData.cpf,
      Nome: formData.nome,
      Salario: parseFloat(formData.salario),
      Imagem: formData.imagem || "",
      Descricao: formData.descricao,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("Enviando funcionário:", novoFuncionario);

    try {
      // Cria o funcionário e obtém o ID
      const funcionarioCriado = await onCreateFuncionario(novoFuncionario);
      const idFuncionario =
        funcionarioCriado?.Id_Funcionario || funcionarioCriado?.id;

      // Cria os adicionais relacionados
      if (formData.adicionais.length > 0 && idFuncionario) {
        for (const adicional of formData.adicionais) {
          await adicionaisController.create({
            Nome: adicional.nome,
            Valor: adicional.valor,
            FK_Funcionario: idFuncionario,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }

      onClose();
      setFormData({
        id: "",
        nome: "",
        cpf: "",
        cep: "",
        salario: "",
        imagem: null,
        adicionais: [],
        valorAdicional: "",
        adicionalSelecionado: "",
        descricao: "",
      });
    } catch (error) {
      console.error("Erro ao criar funcionário e adicionais:", error);
    }
  };

  const handleAddAdicional = () => {
    const nome = formData.adicionalSelecionado;
    const valor = parseFloat(formData.valorAdicional) || 0;

    if (!nome || valor <= 0) return;

    const novoAdicional = { nome, valor };

    setFormData((prev) => ({
      ...prev,
      adicionais: [...prev.adicionais, novoAdicional],
      valorAdicional: "",
      adicionalSelecionado: "",
    }));
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

          <label>Imagem (Avatar)</label>
          <select
            name="imagem"
            id="imagem"
            value={formData.imagem || ""}
            onChange={handleChange}
          >
            <option value="">Selecione um avatar</option>
            {avatarOptionsFuncionarios.map((avatar, index) => (
              <option key={index} value={avatar.src}>
                {avatar.label}
              </option>
            ))}
          </select>

          {/* Preview do avatar escolhido */}
          {formData.imagem && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={formData.imagem}
                alt="Avatar selecionado"
                style={{ width: 80, height: 80, borderRadius: "50%" }}
              />
            </div>
          )}

          <div className="AdicionaisContainer">
            <div className="AdicionaisContent">
              <label>Adicionais</label>
              <select
                name="adicionalSelecionado"
                id="adicionais"
                value={formData.adicionalSelecionado}
                onChange={handleChange}
              >
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
          <ul
            className={`adicionais-list ${
              formData.adicionais.length > 0 ? "" : "com-padding"
            }`}
          >
            {formData.adicionais.map((adicional, index) => (
              <li key={index}>
                {adicional.nome} - R$ {adicional.valor.toFixed(2)}
              </li>
            ))}
          </ul>

          <label>Descrição (Atuação)</label>
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
