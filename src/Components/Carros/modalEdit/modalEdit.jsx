import { useState, useEffect } from "react";
import carroImageParticular from "../assets/Particulares.jpg";
import carroImageSeguradora from "../assets/Seguradoras.jpg";
import DescricaoIcon from "../assets/possessory.png";
import ProprietarioIcon from "../assets/customer-service.png";
import ValorTotalIcon from "../assets/money.png";
import "./modalEdit.css";

export default function ModalEditCarros({
  isOpen,
  onClose,
  tipo,
  onUpdateCarro,
  carroData,
}) {
  const [formData, setFormData] = useState(carroData);

  useEffect(() => {
    if (carroData) {
      setFormData({
        ...carroData,
        Descricao: carroData.Descricao ?? carroData.title ?? "",
        Proprietario: carroData.Proprietario ?? carroData.owner ?? "",
        ValorTotal: carroData.ValorTotal ?? carroData.value ?? "",
      });
    }
  }, [carroData]);

  if (!isOpen || !carroData) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tipoId = tipo === "particular" ? 1 : 2;

    const carroAtualizado = {
      Id_Carro: formData.id,
      NomeVeiculo: formData.NomeVeiculo || formData.title,
      Data_Criacao: formData.Data_Criacao,
      Imagem: formData.image || formData.Imagem || "",
      ValorTotal: parseFloat(String(formData.ValorTotal).replace(",", ".")),
      Descricao: formData.Descricao,
      FK_TipoCarro: tipoId,
      createdAt: formData.createdAt,
      updatedAt: new Date().toISOString(),
      Proprietario: formData.Proprietario || formData.owner || "",
    };

    try {
      console.log("carroAtualizado:", carroAtualizado);
      await onUpdateCarro(carroAtualizado);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar o carro:", error);

      if (error.response) {
        console.error("Resposta da API:", error.response.data);
      } else if (error.json) {
        const data = await error.json();
        console.error("Resposta da API:", data);
      }
    }
  };

  return (
    <>
      <div
        id="fade"
        className={`modal-fade ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <div
        id="modalEdit"
        className={`modal-container-edit ${isOpen ? "show" : ""}`}
      >
        <div className="modal-Header-edit">
          <h2 id="modal-title-edit">{formData.title}</h2>
        </div>

        <div className="modal-image-edit">
          <img
            src={
              formData.type === "particular"
                ? carroImageParticular
                : carroImageSeguradora
            }
            alt={formData.title}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkbox-edit">
            <input
              type="checkbox"
              name="Retrabalhado"
              checked={formData.Retrabalhado || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  Retrabalhado: e.target.checked,
                }))
              }
            />
            <label>Retrabalhado</label>
          </div>

          <div className="spaceIcon-edit">
            <img src={DescricaoIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>Descrição / Reparo:</label>
              <textarea
                className="input-text-edit"
                name="Descricao"
                placeholder="..."
                value={formData.Descricao || ""}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </div>

          <div className="spaceIcon-edit">
            <img src={ProprietarioIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>Proprietário do Veículo</label>
              <input
                type="text"
                name="Proprietario"
                value={formData.Proprietario || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="spaceIcon-edit">
            <img src={ValorTotalIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>Valor Total (R$):</label>
              <input
                type="number"
                name="ValorTotal"
                value={formData.ValorTotal || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-button-edit">
            <button type="submit" className="enviar-button-edit">
              Atualizar
            </button>
            <button
              type="button"
              className="enviar-button-close"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
