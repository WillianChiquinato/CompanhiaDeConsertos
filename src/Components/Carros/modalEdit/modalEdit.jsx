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
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 400);
    }
  }, [isOpen]);

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
      Imagem: "Golf.jpg", // Placeholder, adjust as needed
      ValorTotal: parseFloat(String(formData.ValorTotal).replace(",", ".")),
      Descricao: formData.Descricao,
      FK_TipoCarro: tipoId,
      createdAt: formData.createdAt,
      updatedAt: new Date().toISOString(),
      Proprietario: formData.Proprietario || formData.owner || "",
      retrabalho: formData.retrabalho || false,
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

  if (!visible) return null;

  return (
    <>
      <div
        id="fade"
        className={`modal-fade ${animate ? "show" : ""}`}
        onClick={onClose}
      />

      <div
        id="modalEdit"
        className={`modal-container-edit ${animate ? "show" : ""}`}
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
              name="retrabalho"
              checked={formData.retrabalho || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  retrabalho: e.target.checked,
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
            <button
              id="fechar-modal"
              type="submit"
              className="enviar-button-edit"
            >
              Atualizar
            </button>
            <button
              id="fechar-modal"
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
