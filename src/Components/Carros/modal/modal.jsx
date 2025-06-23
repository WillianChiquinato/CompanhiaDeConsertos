import "./modal.css";
import { useState, useEffect } from "react";

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
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : value,
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
      Imagem: formData.imagem ? formData.imagem.name : "",
      Data_Criacao: formData.dataCriacao
        ? new Date(formData.dataCriacao).toISOString()
        : null,
      Descricao: formData.descricao,
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

        <form onSubmit={handleSubmit}>
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
            <option value="">Digite algo</option>
            <option value="Gol">Gol</option>
            <option value="Onix">Onix</option>
            <option value="Corolla">Corolla</option>
          </select>

          <label>Nome Proprietário</label>
          <input
            type="text"
            name="nomeProprietario"
            placeholder="Digite algo"
            value={formData.nomeProprietario}
            onChange={handleChange}
          />

          <label>Imagem</label>
          <input type="file" name="imagem" onChange={handleChange} />

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
