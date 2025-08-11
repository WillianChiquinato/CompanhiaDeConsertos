import { avatarOptionsCarros } from "../../../data/avatars.jsx";
import { useState, useEffect } from "react";
import "./modal.css";

export default function ModalCarros({ isOpen, onClose, tipo, onCreateCarro }) {
  const [formData, setFormData] = useState({
    tipo: "",
    dataCriacao: "",
    nomeVeiculo: "",
    nomeProprietario: "",
    imagem: null,
    valorTotal: "",
    descricao: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tipo: tipo,
    }));
  }, [tipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);

    const tipoId = tipo === "particular" ? 1 : 2;

    const novoCarro = {
      NomeVeiculo: formData.nomeVeiculo,
      ValorTotal: parseFloat(formData.valorTotal),
      FK_TipoCarro: tipoId,
      Proprietario: formData.nomeProprietario,
      Imagem: formData.imagem || "",
      Data_Criacao: formData.dataCriacao
        ? new Date(formData.dataCriacao).toISOString()
        : null,
      Descricao: formData.descricao,
      retrabalho: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await onCreateCarro(novoCarro);
      onClose();
      setFormData({
        tipo: tipo,
        dataCriacao: "",
        nomeVeiculo: "",
        nomeProprietario: "",
        imagem: null,
        valorTotal: "",
        descricao: "",
      });
    } catch (error) {
      console.error("Erro ao criar o carro:", error);
    }
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
          <h2 id="modal-title">Carros</h2>
          <button id="fechar-modal" className="button" onClick={onClose}>
            Sair
          </button>
        </div>

        <form onSubmit={handleSubmit} className="FormularioContainer">
          <label>Data Criação</label>
          <input
            type="date"
            name="dataCriacao"
            placeholder="XX/XX/XXXX"
            value={formData.dataCriacao}
            onChange={handleChange}
          />

          <label>Nome Veículo</label>
          <select
            name="nomeVeiculo"
            value={formData.nomeVeiculo}
            onChange={handleChange}
          >
            <option value="">Selecione um veículo</option>
            <option value="Gol">Gol</option>
            <option value="Onix">Onix</option>
            <option value="Corolla">Corolla</option>
            <option value="Civic">Civic</option>
            <option value="Uno">Uno</option>
            <option value="HB20">HB20</option>
            <option value="Palio">Palio</option>
            <option value="Fiesta">Fiesta</option>
            <option value="Cruze">Cruze</option>
            <option value="Kwid">Kwid</option>
            <option value="Sandero">Sandero</option>
            <option value="Duster">Duster</option>
            <option value="Renegade">Renegade</option>
            <option value="Compass">Compass</option>
            <option value="Toro">Toro</option>
            <option value="Strada">Strada</option>
            <option value="S10">S10</option>
            <option value="Hilux">Hilux</option>
            <option value="Saveiro">Saveiro</option>
            <option value="Amarok">Amarok</option>
          </select>

          <label>Nome Proprietário</label>
          <input
            type="text"
            name="nomeProprietario"
            placeholder="Digite algo"
            value={formData.nomeProprietario}
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
            {avatarOptionsCarros.map((avatar, index) => (
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

          <label>Valor total</label>
          <input
            type="number"
            name="valorTotal"
            placeholder="Apenas inteiros"
            value={formData.valorTotal}
            onChange={handleChange}
          />

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
