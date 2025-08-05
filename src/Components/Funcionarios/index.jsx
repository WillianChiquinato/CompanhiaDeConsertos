import { useState, useEffect } from "react";
import FormatadorMoeda from "../Utilitario/util";
import funcionarioPadrao from "../Funcionarios/assets/FuncionarioPadrao.png";
import Filtro from "./assets/Filtro.png";
import BotaoForms from "./assets/BotaoForms.png";
import Modal from "../Funcionarios/modal/modal";
import ModalConfirma from "../Funcionarios/modalConfirmFunc/modalConfirma";
import useApiController from "../../services/controller";
import ModalEditFuncionario from "./modalEditFunc/modalEdit";
import AlertMessage from "../Alerts/alertMessage";
import "./styles.css";

function FuncionarioItem({
  title,
  image,
  salary,
  adicionaisLista,
  id,
  openModal,
  openModalEdit,
}) {
  return (
    <div className="BoxFuncionariosList">
      <span className="TitleFuncionariosList">{title}</span>
      <img src={funcionarioPadrao} alt={image} height={200} />
      <span className="ConteudoFuncionariosList">
        <span className="TopicosTitle">💰Salário:</span>{" "}
        <FormatadorMoeda valor={salary} />
      </span>
      <span className="ConteudoFuncionariosList">
        <span className="TopicosTitle2">➕Adicionais Contagem:</span>{" "}
        {adicionaisLista}
      </span>

      <div className="ButtonsAlignFuncionariosList">
        <button
          className="DetalhesFuncionariosList"
          onClick={(e) => {
            e.preventDefault();
            openModalEdit(id); // Chama a função openModal ao clicar no botão
          }}
        >
          Editar/Detalhes
        </button>
        <button
          className="EditarFuncionariosList"
          onClick={(e) => {
            e.preventDefault();
            openModal(id); // Chama a função openModal ao clicar no botão
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

function BotaoAddFuncionario({
  image,
  openModal,
  closeModal,
  showModal,
  onCreateFuncionario,
  adicionaisController,
}) {
  return (
    <>
      <div className="BoxAddFuncionarios">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // impede o link de recarregar a página
            openModal();
          }}
        >
          <img src={image} alt="AdicionarFuncionario" />
        </a>
      </div>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        onCreateFuncionario={onCreateFuncionario}
        adicionaisController={adicionaisController}
      />
    </>
  );
}

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [funcionarioParaRemover, setFuncionarioParaRemover] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [funcionarioParaEditar, setFuncionarioParaEditar] = useState(null);
  const [adicionaisParaEditar, setAdicionaisParaEditar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [ordemAlfabetica, setOrdemAlfabetica] = useState("asc");

  const [alert, setAlert] = useState(null);

  const adicionaisFuncionarioController = useApiController(
    "adicionaisfuncionario"
  );
  const FuncionarioController = useApiController("funcionario");

  const fetchData = async () => {
    try {
      // 1. Buscar os Adicionais por Funcionário
      const adicionaisPorFuncionario =
        await adicionaisFuncionarioController.getAllGroupedByFuncionario();

      // 2. Buscar os Funcionarios
      const funcionariosData = await FuncionarioController.getAll();

      setFuncionarios(
        funcionariosData.map((funcionario) => {
          return {
            ...funcionario,
            adicionaisLista:
              adicionaisPorFuncionario[funcionario.Id_Funcionario] || [],
          };
        })
      );
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [FuncionarioController, adicionaisFuncionarioController]);

  // Criar um funcionario
  const handleCreateFuncionario = async (novoFunci) => {
    try {
      const funcionarioCriado = await FuncionarioController.create(novoFunci);
      await fetchData();
      setAlert({ message: "Funcionario criado com sucesso!", type: "success" });
      // Remove o alerta após 3 segundos
      setTimeout(() => setAlert(null), 3000);

      return funcionarioCriado;
    } catch (error) {
      console.error("Erro ao criar funcionario:", error);
      setAlert({ message: "Erro ao criar o funcionario. Tente novamente.", type: "error" });
      setTimeout(() => setAlert(null), 3000);

      throw error;
    }
  };

  // Update um funcionario
  const handleUpdateFuncionario = async (funcionarioAtualizado) => {
    if (!funcionarioParaEditar && !adicionaisParaEditar) return;

    try {
      await FuncionarioController.update(
        funcionarioAtualizado.Id_Funcionario,
        funcionarioAtualizado
      );
      setAlert({ message: "Funcionario atualizado com sucesso!", type: "success" });
      setTimeout(() => setAlert(null), 3000);

      await fetchData();
    } catch (error) {
      console.error("Erro ao atualizar funcionario:", error);
      setAlert({ message: "Erro ao atualizar o funcionario...", type: "error" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const removerFuncionario = async () => {
    if (!funcionarioParaRemover) return;

    try {
      await FuncionarioController.deleteRecord(funcionarioParaRemover.id);
      console.log(
        `Funcionario ${funcionarioParaRemover.id} removido com sucesso.`
      );
      setAlert({ message: "Funcionario removido com sucesso!", type: "success" });
      setTimeout(() => setAlert(null), 3000);

      // Atualiza a lista de funcionarios
      await fetchData();
    } catch (error) {
      console.error("Erro ao remover funcionario:", error);
      setAlert({ message: "Erro ao remover o funcionario.", type: "error" });
      setTimeout(() => setAlert(null), 3000);
    }

    setShowDeleteModal(false);
  };

  const handleTotalSalaries = () => {
    const total = funcionarios.reduce((acc, funcionario) => {
      return acc + Number(funcionario.Salario);
    }, 0);

    return <FormatadorMoeda valor={total} />;
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const openDeleteModal = (id) => {
    setFuncionarioParaRemover({ id });
    setShowDeleteModal(true);
  };

  const openModalEdit = (id) => {
    const funcionario = funcionarios.find((f) => f.Id_Funcionario === id);
    setFuncionarioParaEditar(funcionario);
    setAdicionaisParaEditar(funcionario.adicionaisLista);
    setShowEditModal(true);
    console.log(`Abrindo modal de edição para o funcionário: ${id}`);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setFuncionarioParaRemover(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setFuncionarioParaEditar(null);
    setAdicionaisParaEditar(null);
  };

  const OrdenarFuncionarios = (funcionarios) => {
    let resultado = [...funcionarios];

    resultado.sort((a, b) => {
      return ordemAlfabetica === "asc"
        ? a.Nome.localeCompare(b.Nome)
        : b.Nome.localeCompare(a.Nome);
    });

    return resultado;
  };

  return (
    <>
      <article className="Funcionarios">
        <div className="TitulosContainer">
          <span className="TituloFuncionarios"> FUNCIONÁRIOS </span>
          <div className="dropdown">
            <button className="filtro-btn">🔽 Filtros</button>
            <div className="dropdown-content">
              <span onClick={() => setOrdemAlfabetica("asc")}>A - Z</span>
              <span onClick={() => setOrdemAlfabetica("desc")}>Z - A</span>
            </div>
          </div>
        </div>
        <hr className="TituloHR" />

        {/* Agr a lista de funcionarios adicionados: */}
        <div className="FuncionariosList">
          <BotaoAddFuncionario
            image={BotaoForms}
            openModal={() => openModal()}
            closeModal={closeModal}
            showModal={showModal}
            onCreateFuncionario={handleCreateFuncionario}
            adicionaisController={adicionaisFuncionarioController}
          />

          {OrdenarFuncionarios(funcionarios).map((funcionario) => (
            <FuncionarioItem
              key={funcionario.Id_Funcionario}
              id={funcionario.Id_Funcionario}
              title={funcionario.Nome}
              image={funcionario.Imagem}
              salary={funcionario.Salario}
              adicionaisLista={funcionario.adicionaisLista?.length || 0}
              openModal={() => openDeleteModal(funcionario.Id_Funcionario)}
              openModalEdit={(id) => openModalEdit(id)}
              onUpdateCarro={handleUpdateFuncionario}
              closeModal={closeModal}
              showModal={showModal}
            />
          ))}
        </div>
      </article>

      <footer className="FooterFuncionarios">
        <span>Total de salários: R${handleTotalSalaries()}</span>
      </footer>

      <ModalConfirma
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => removerFuncionario(removerFuncionario)}
      />

      {(funcionarioParaEditar || adicionaisParaEditar) && (
        <ModalEditFuncionario
          isOpen={showEditModal}
          onClose={closeEditModal}
          onUpdateFuncionario={handleUpdateFuncionario}
          funcionarioData={funcionarioParaEditar}
          adicionaisData={adicionaisParaEditar}
          adicionaisController={adicionaisFuncionarioController}
        />
      )}

      {alert && <AlertMessage message={alert.message} type={alert.type} />}
    </>
  );
}
