import { useState } from "react";
import "./modal.css";

export default function ModalCarros({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    dataCriacao: "",
    nomeVeiculo: "",
    nomeProprietario: "",
    imagem: null,
    valorTotal: "",
    descricao: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    //Limpando o formulário após o envio
    setFormData({
        dataCriacao: "",
        nomeVeiculo: "",
        nomeProprietario: "",
        imagem: null,
        valorTotal: "",
        descricao: "",
        });

    // Aqui você pode enviar para a API, salvar no banco, etc.
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
            type="text"
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

          <button type="submit" className="enviar-button">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
