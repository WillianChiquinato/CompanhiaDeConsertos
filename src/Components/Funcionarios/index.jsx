import { useState, useEffect } from "react";
import FormatadorMoeda from '../Utilitario/util'; 
import funcionarioPadrao from "../Funcionarios/assets/FuncionarioPadrao.png";
import Filtro from "./assets/Filtro.png";
import BotaoForms from "./assets/BotaoForms.png";
import Modal from "../Funcionarios/modal/modal";
import ModalConfirma from "../Funcionarios/modalConfirmFunc/modalConfirma";
import useApiController from "../../services/controller";
import "./styles.css";
// import ModalEditCarros from "./modalEditFunc/modalEdit";

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
      <span className="ConteudoFuncionariosList">Salário: <FormatadorMoeda valor={salary} /></span>
      <span className="ConteudoFuncionariosList">
        Adicionais Contagem: {adicionaisLista}
      </span>

      <div className="ButtonsAlignFuncionariosList">
        <button
          className="DetalhesFuncionariosList"
          onClick={(e) => {
            e.preventDefault();
            openModalEdit(id); // Chama a função openModal ao clicar no botão
          }}
        >
          Editar
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
  // const [showEditModal, setShowEditModal] = useState(false);

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

  // Criar um carro
  const handleCreateFuncionario = async (novoFunci) => {
    try {
      await FuncionarioController.create(novoFunci);
      await fetchData();
    } catch (error) {
      console.error("Erro ao criar funcionario:", error);
    }
  };

  // Update um funcionario
  const handleUpdateFuncionario = async (funcionarioAtualizado) => {
    if (!funcionarioParaEditar) return;

    try {
      await FuncionarioController.update(
        funcionarioAtualizado.Id_Funcionario,
        funcionarioAtualizado
      );
      console.log(
        `Funcionario ${funcionarioParaEditar} atualizado com sucesso.`
      );
      await fetchData();
    } catch (error) {
      console.error("Erro ao atualizar funcionario:", error);
    }
  };

  const removerFuncionario = async () => {
    if (!funcionarioParaRemover) return;

    try {
      await FuncionarioController.deleteRecord(funcionarioParaRemover.id);
      console.log(
        `Funcionario ${funcionarioParaRemover.id} removido com sucesso.`
      );

      // Atualiza a lista de funcionarios
      await fetchData();
    } catch (error) {
      console.error("Erro ao remover funcionario:", error);
    }

    setShowDeleteModal(false);
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
    const funcionario = funcionarios.find((f) => f.id === id);
    setFuncionarioParaEditar(funcionario);
    // setShowEditModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setFuncionarioParaRemover(null);
  };

  // const closeEditModal = () => {
  //   setShowEditModal(false);
  //   setFuncionarioParaEditar(null);
  // };

  return (
    <>
      <article className="Funcionarios">
        <div className="TitulosContainer">
          <span className="TituloFuncionarios"> FUNCIONÁRIOS </span>
          <img src={Filtro} alt="Filtro" className="FiltroFuncionarios" />
        </div>
        <hr className="TituloHR" />

        {/* Agr a lista de funcionarios adicionados: */}
        <div className="FuncionariosList">
          <BotaoAddFuncionario
            image={BotaoForms}
            openModal={() => openModal()}
            closeModal={closeModal}
            showModal={showModal}
            onCreateCarro={handleCreateFuncionario}
          />

          {funcionarios.map((funcionario) => (
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

      <ModalConfirma
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => removerFuncionario(removerFuncionario)}
      />
    </>
  );
}
