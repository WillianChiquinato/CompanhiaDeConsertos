import { useState, useEffect } from "react";
import useApiController from "../../services/controller";
import ResponsavelIcon from "./assets/product-manager.png";
import DataIcon from "./assets/deadline.png";
import ValorIcon from "./assets/deposit.png";
import DescricaoIcon from "./assets/description.png";
import ListaDespesas from "./ListaDespesas";
import AlertMessage from "../Alerts/alertMessage";
import "./styles.css";

function FormularioBase({
  id,
  ResponsavelTitle,
  DataTitle,
  ValorTitle,
  DescricaoTitle,
  activeForms,
  onCreateDespesa,
}) {
  const [formData, setFormData] = useState({
    NomeResponsavel: "",
    Data: "",
    Valor: "",
    Descricao: "",
  });

  const tratamentoId = (id) => {
    switch (id) {
      case "equipamentos":
        return 1;
      case "contas":
        return 2;
      default:
        return 3;
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "imagem" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const novaDespesa = {
      NomeResponsavel: formData.NomeResponsavel,
      Data: formData.Data
        ? new Date(formData.Data).toISOString()
        : null,
      Valor: parseFloat(formData.Valor),
      Descricao: formData.Descricao,
      FK_TipoDespesa: tratamentoId(id),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    try {
      await onCreateDespesa(novaDespesa);

      setFormData({
        NomeResponsavel: "",
        Data: "",
        Valor: "",
        Descricao: "",
      });
    } catch (error) {
      console.error("Erro ao criar a despesa:", error);
    }
  };

  return (
    <>
      <form
        id={id}
        className={`form ${activeForms === id ? "active-form" : ""}`}
        onSubmit={handleSubmit}
      >
        <div className="topicosComIcon">
          <img src={ResponsavelIcon} alt="Ícone de Responsável" />
          <label>{ResponsavelTitle}</label>
        </div>
        <select
          name="NomeResponsavel"
          value={formData.NomeResponsavel}
          onChange={handleChange}
        >
          <option>Selecione...</option>
          <option>Murilo canhão</option>
          <option>Pai do murilo canhão</option>
          <option>Mãe do murilo canhão</option>
        </select>

        <div className="topicosComIcon">
          <img src={DataIcon} alt="Ícone de Data" />
          <label>{DataTitle}</label>
        </div>
        <input type="date" 
          id="data"
          name="Data"
          value={formData.Data}
          onChange={handleChange}
        />

        <div className="topicosComIcon">
          <img src={ValorIcon} alt="Ícone de Valor" />
          <label>{ValorTitle}</label>
        </div>
        <input
          type="text"
          id="valor"
          name="Valor"
          placeholder="Digite um valor..."
          value={formData.Valor}
          onChange={handleChange}
        />

        <div className="topicosComIcon">
          <img src={DescricaoIcon} alt="Ícone de Descrição" />
          <label>{DescricaoTitle}</label>
        </div>
        <textarea
          name="Descricao"
          placeholder="Digite algo..."
          rows={3}
          value={formData.Descricao}
          onChange={handleChange}
        />

        <div className="AlignButton">
          <button type="submit">Adicionar</button>
        </div>
      </form>
    </>
  );
}

export default function Despesas() {
  const [activeForm, setActiveForm] = useState("equipamentos");
  const [selectedAccordion, setSelectedAccordion] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [contas, setContas] = useState([]);
  const [outros, setOutros] = useState([]);

  const [alert, setAlert] = useState(null);

  const tipoDespesaController = useApiController("tipodespesa");
  const despesaController = useApiController("despesa");

  const fetchData = async () => {
    try {
      // 1. Buscar os Tipos de Despesas
      const tiposData = await tipoDespesaController.getAll();

      const tiposLookup = {};
      tiposData.forEach((tipo) => {
        tiposLookup[tipo.Id_TipoDespesa] = tipo.TituloTipo;
      });

      // 2. Buscar as Despesas
      const despesasData = await despesaController.getAll();

      const despesasComTipo = despesasData.map((despesa) => ({
        id: despesa.Id_Despesa,
        type: tiposLookup[despesa.FK_TipoDespesa]?.toLowerCase() || "",
        ...despesa,
      }));

      // 3. Separar em listas
      setEquipamentos(despesasComTipo.filter((d) => d.type === "equipamento"));
      setContas(despesasComTipo.filter((d) => d.type === "contas"));
      setOutros(despesasComTipo.filter((d) => d.type === "outros"));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [despesaController, tipoDespesaController]);

  const handleCreateDespesa = async (novaDespesa) => {
    try {
      console.log("Criando despesa:", novaDespesa);
      const despesaCriada = await despesaController.create(novaDespesa);
      await fetchData();
      setAlert({ message: "Despesa criada com sucesso!", type: "success" });
      setTimeout(() => setAlert(null), 3000);

      return despesaCriada;
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
      setAlert({ message: "Erro ao criar a despesa.", type: "error" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleDeleteDespesa = async (id) => {
    if (!id) return;

    try {
      await despesaController.deleteRecord(id);
      console.log(
        `Despesa ${id} removida com sucesso.`
      );
      setAlert({ message: "Despesa removida com sucesso!", type: "success" });
      setTimeout(() => setAlert(null), 3000);

      // Atualiza a lista de despesas
      await fetchData();
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
      setAlert({ message: "Erro ao remover a despesa.", type: "error" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const toggleAccordion = (i) => {
    if (selectedAccordion === i) {
      return setSelectedAccordion(null);
    }

    setSelectedAccordion(i);
  };

  return (
    <>
      <article className="Despesas">
        <span className="TituloDespesas"> DESPESAS </span>
        <hr className="TituloHR" />

        <div className="tabs">
          <button
            className={`tab-btn ${
              activeForm === "equipamentos" ? "active" : ""
            }`}
            onClick={() => setActiveForm("equipamentos")}
          >
            Equipamentos
          </button>
          <button
            className={`tab-btn ${activeForm === "contas" ? "active" : ""}`}
            onClick={() => setActiveForm("contas")}
          >
            Contas
          </button>
          <button
            className={`tab-btn ${activeForm === "outros" ? "active" : ""}`}
            onClick={() => setActiveForm("outros")}
          >
            Outros
          </button>
        </div>

        <div className="form-container">
          {/* <!-- Formulário de Equipamentos --> */}
          {FormularioBase({
            id: "equipamentos",
            ResponsavelTitle: "Responsável",
            DataTitle: "Data de Registro",
            ValorTitle: "Valor Total",
            DescricaoTitle: "Descrição (Equipamento)",
            activeForms: activeForm,
            onCreateDespesa: handleCreateDespesa,
          })}

          {/* <!-- Formulário de Contas --> */}
          {FormularioBase({
            id: "contas",
            ResponsavelTitle: "Responsável",
            DataTitle: "Data de Vencimento",
            ValorTitle: "Valor da Conta",
            DescricaoTitle: "Descrição (Tipo da conta)",
            activeForms: activeForm,
            onCreateDespesa: handleCreateDespesa,
          })}

          {/* <!-- Formulário de Outros --> */}
          {FormularioBase({
            id: "outros",
            ResponsavelTitle: "Responsável",
            DataTitle: "Data de Registro",
            ValorTitle: "Valor Estimado",
            DescricaoTitle: "Descrição (Outros)",
            activeForms: activeForm,
            onCreateDespesa: handleCreateDespesa,
          })}
        </div>
      </article>

      <ListaDespesas
        equipamentos={equipamentos}
        contas={contas}
        outros={outros}
        toggleAccordion={toggleAccordion}
        selectedAccordion={selectedAccordion}
        handleDeleteDespesa={handleDeleteDespesa}
      />

      {alert && <AlertMessage message={alert.message} type={alert.type} />}
    </>
  );
}
