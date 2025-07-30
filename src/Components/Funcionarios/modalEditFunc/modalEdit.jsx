import { useState, useEffect } from "react";
import FormatadorMoeda from "../../Utilitario/util";
import FuncionarioPadrao from "../assets/FuncionarioPadrao.png";
import NomeIcon from "../assets/NomeIcon.png";
import DescricaoIcon from "../assets/Descricao.png";
import CpfIcon from "../assets/CpfIcon.png";
import CepIcon from "../assets/CepIcon.png";
import SalarioIcon from "../assets/Salario.png";
import ListaAddIcon from "../assets/Lista.png";
import RemoveIcon from "../assets/Lixeira.png";
import ModalFuncionarios from "../index";
import "./modalEdit.css";

export default function ModalEditFuncionarios({
  isOpen,
  onClose,
  onUpdateFuncionario,
  funcionarioData,
  adicionaisData,
  adicionaisController,
}) {
  const [formData, setFormData] = useState(funcionarioData);
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
    if (funcionarioData) {
      setFormData({
        ...funcionarioData,
        Adicionais: adicionaisData || [],
      });
    }
  }, [funcionarioData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : value,
    }));
  };

  const handleAddAdicional = () => {
    const nome = formData.adicionalSelecionado;
    const valor = parseFloat(formData.valorAdicional);

    if (!nome || isNaN(valor) || valor <= 0) return;

    const novoAdicional = { nome, valor };
    console.log("Novo adicional:", novoAdicional);

    setFormData((prev) => ({
      ...prev,
      Adicionais: [...(prev.Adicionais || []), novoAdicional],
      valorAdicional: "",
      adicionalSelecionado: "",
    }));
  };

  const handleRemoveAdicional = async (index) => {
    const adicional = formData.Adicionais[index];

    try {
      if (adicional.Id_AdicionaisFuncionario) {
        await adicionaisController.deleteRecord(
          adicional.Id_AdicionaisFuncionario
        );
      }

      // Atualiza a lista local (UI).
      setFormData((prev) => ({
        ...prev,
        Adicionais: prev.Adicionais.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error("Erro ao remover adicional:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const funcionarioAtualizado = {
      Id_Funcionario: formData.Id_Funcionario,
      Nome: formData.Nome || formData.title,
      Salario: formData.Salario || formData.value,
      Imagem: "funcionarioPadrao.png", // Placeholder, adjust as needed
      Descricao: formData.Descricao,
      createdAt: formData.createdAt,
      updatedAt: new Date().toISOString(),
    };

    try {
      await onUpdateFuncionario(funcionarioAtualizado);

      if (
        formData.Adicionais.length > 0 &&
        funcionarioAtualizado.Id_Funcionario
      ) {
        for (const adicional of formData.Adicionais) {
          if (!adicional.Id_AdicionaisFuncionario) {
            await adicionaisController.create({
              Nome: adicional.nome || adicional.Nome,
              Valor: adicional.valor || adicional.Valor,
              FK_Funcionario: funcionarioAtualizado.Id_Funcionario,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        }
      }
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar o funcionario:", error);

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
          <h2 id="modal-title-edit">{formData.Nome}</h2>
        </div>

        <div className="modal-image-edit">
          <img src={FuncionarioPadrao} alt={formData.Nome} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="spaceIcon-edit">
            <img src={NomeIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>Nome do Funcionário</label>
              <input
                type="text"
                name="Nome"
                value={formData.Nome || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="spaceIcon-edit">
            <img src={CpfIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>CPF (Apenas Exibição):</label>
              <input
                type="text"
                name="Cpf"
                value={formData.Id_Funcionario || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="spaceIcon-edit">
            <img src={CepIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>CEP:</label>
              <input
                type="text"
                name="Cep"
                value={formData.Cep || "09390-530"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="spaceIcon-edit">
            <img src={SalarioIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>Salário (R$):</label>
              <input
                type="number"
                name="Salario"
                value={formData.Salario || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />

          <div className="spaceIcon-edit">
            <img src={ListaAddIcon} alt="Icon" />
            <div className="EditContent">
              <div className="spaceIcon-input-edit">
                <div className="editContentColumn">
                  <div className="AdicionaisContentEdit">
                    <label>Novo Adicional:</label>
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

                  <div className="AdicionaisContentEdit">
                    <label>Valor Adicional</label>
                    <input
                      type="number"
                      name="valorAdicional"
                      placeholder="Digite o valor do adicional..."
                      value={formData.valorAdicional}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="ButtonsEditAdicional">
                <button
                  type="button"
                  className="buttonAdicionalEdit"
                  onClick={handleAddAdicional}
                >
                  Adicionar
                </button>
              </div>

              <div className="spaceIcon-input-edit">
                <label>Lista Adicionais ({formData.Adicionais.length}):</label>
                <ol className="list-Adicionais-edit">
                  {formData.Adicionais.map((item, index) => (
                    <li key={index} className="list-item-edit">
                      <span className="list-item-title-edit">
                        {item.nome || item.Nome} -{" "}
                        <FormatadorMoeda valor={item.valor || item.Valor} />
                      </span>
                      {item.Id_AdicionaisFuncionario && (
                        <a
                          href="#"
                          onClick={() => handleRemoveAdicional(index)}
                        >
                          <img src={RemoveIcon} alt="Remover" />
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <br />

          <div className="spaceIcon-edit">
            <img src={DescricaoIcon} alt="Icon" />
            <div className="spaceIcon-input-edit">
              <label>Descrição / Atuação:</label>
              <textarea
                className="input-text-edit"
                name="Descricao"
                placeholder="..."
                value={formData.Descricao || ""}
                onChange={handleChange}
                rows={3}
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
