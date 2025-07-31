import { useState, useEffect } from "react";
import carroImageParticular from "./assets/Particulares.jpg";
import carroImageSeguradora from "./assets/Seguradoras.jpg";
import Filtro from "./assets/Filtro.png";
import BotaoForms from "./assets/BotaoForms.png";
import Modal from "../../Components/Carros/modal/modal";
import ModalConfirma from "../../Components/Carros/modalConfirm/modalConfirma";
import useApiController from "../../services/controller";
import ModalEditCarros from "./modalEdit/modalEdit";
import "./styles.css";

function CarrosTitle({ classContainer, classTitle, title, number }) {
  return (
    <>
      <div className={classContainer}>
        <span className={classTitle}> {title}</span>
        <span className="TituloCarrosNumeros"> ({number}) </span>
        <a href="">
          <img src={Filtro} alt="FiltroCarros" />
        </a>
      </div>
      <hr className="CarrosHR" />
    </>
  );
}

function CarrosItem({
  title,
  image,
  type,
  owner,
  value,
  id,
  openModal,
  openModalEdit,
}) {
  return (
    <div className="BoxCarrosList">
      <span className="TitleCarrosList">{title}</span>
      <img src={image} alt={title} height={170} />
      <span className="ConteudoCarrosList">Tipo: {type}</span>
      <span className="ConteudoCarrosList">Proprietário: {owner}</span>
      <span className="ConteudoCarrosList">Valor total (R$): {value}</span>

      <div className="ButtonsAlignCarrosList">
        <button
          className="DetalhesCarrosList"
          onClick={(e) => {
            e.preventDefault();
            openModalEdit(id); // Chama a função openModal ao clicar no botão
          }}
        >
          Editar
        </button>
        <button
          className="EditarCarrosList"
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

function BotaoAddCarros({
  image,
  openModal,
  closeModal,
  showModal,
  tipo,
  onCreateCarro,
}) {
  return (
    <>
      <div className="BoxAddCarro">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // impede o link de recarregar a página
            openModal();
          }}
        >
          <img src={image} alt="AdicionarCarro" />
        </a>
      </div>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        tipo={tipo}
        onCreateCarro={onCreateCarro}
      />
    </>
  );
}

export default function Carros() {
  const [carrosParticulares, setCarrosParticulares] = useState([]);
  const [carrosSeguradora, setCarrosSeguradora] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [carroParaRemover, setCarroParaRemover] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carroParaEditar, setCarroParaEditar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const tipoCarroController = useApiController("tipocarro");
  const carroController = useApiController("carro");

  const fetchData = async () => {
    try {
      // 1. Buscar os Tipos de Carros
      const tiposData = await tipoCarroController.getAll();

      const tiposLookup = {};
      tiposData.forEach((tipo) => {
        tiposLookup[tipo.Id_TipoCarro] = tipo.Descricao;
      });

      // 2. Buscar os Carros
      const carrosData = await carroController.getAll();

      const carrosComTipo = carrosData.map((carro) => ({
        id: carro.Id_Carro,
        title: carro.NomeVeiculo,
        value: carro.ValorTotal,
        type: tiposLookup[carro.FK_TipoCarro] || "desconhecido",
        owner: carro.Proprietario,
        image:
          tiposLookup[carro.FK_TipoCarro] === "particular"
            ? carroImageParticular
            : carroImageSeguradora,

        Descricao: carro.Descricao,
        Data_Criacao: carro.Data_Criacao,
        createdAt: carro.createdAt,
      }));

      // 3. Separar em listas
      setCarrosParticulares(
        carrosComTipo.filter((carro) => carro.type === "particular")
      );
      setCarrosSeguradora(
        carrosComTipo.filter((carro) => carro.type === "seguradora")
      );
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [carroController, tipoCarroController]);

  // Criar um carro
  const handleCreateCarro = async (novoCarro) => {
    try {
      await carroController.create(novoCarro);
      await fetchData();
    } catch (error) {
      console.error("Erro ao criar carro:", error);
    }
  };

  // Update um carro
  const handleUpdateCarro = async (carroAtualizado) => {
    if (!carroParaEditar) return;

    try {
      await carroController.update(carroAtualizado.Id_Carro, carroAtualizado);
      console.log(`Carro ${carroParaEditar} atualizado com sucesso.`);
      await fetchData();
    } catch (error) {
      console.error("Erro ao atualizar carro:", error);
    }
  };

  const removerCarro = async () => {
    if (!carroParaRemover) return;

    try {
      await carroController.deleteRecord(carroParaRemover.id);
      console.log(`Carro ${carroParaRemover.id} removido com sucesso.`);

      // Atualiza a lista de carros
      await fetchData();
    } catch (error) {
      console.error("Erro ao remover carro:", error);
    }

    setShowDeleteModal(false);
  };

  const openModal = (tipo) => {
    setTipoModal(tipo);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const openDeleteModal = (id, tipo) => {
    setCarroParaRemover({ id, tipo });
    setShowDeleteModal(true);
  };

  const openModalEdit = (id) => {
    const carro = [...carrosParticulares, ...carrosSeguradora].find(
      (c) => c.id === id
    );
    setCarroParaEditar(carro);
    setShowEditModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCarroParaRemover(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCarroParaEditar(null);
  };

  return (
    <>
      <article className="Carros">
        <span className="TituloCarros"> CARROS </span>
        <hr className="TituloHR" />

        {/* Lista carros particulares */}
        <CarrosTitle
          classContainer="CarrosPv"
          classTitle="TituloCarrosPv"
          title="Carros Particulares"
          number="30"
        />

        {/* Agr a lista de carros adicionados: */}
        <div className="CarrosList">
          <BotaoAddCarros
            image={BotaoForms}
            openModal={() => openModal("particular")}
            closeModal={closeModal}
            showModal={showModal}
            tipo={tipoModal}
            onCreateCarro={handleCreateCarro}
          />

          {carrosParticulares.map((carro) => (
            <CarrosItem
              key={carro.id}
              {...carro}
              openModal={() => openDeleteModal(carro.id, "particular")}
              openModalEdit={(id) => openModalEdit(id)}
              onUpdateCarro={handleUpdateCarro}
              closeModal={closeModal}
              showModal={showModal}
            />
          ))}
        </div>

        {/* Lista carros seguradora */}
        <CarrosTitle
          classContainer="CarrosSeg"
          classTitle="TituloCarrosSeg"
          title="Carros Seguradora"
          number="30"
        />

        <div className="CarrosList">
          <BotaoAddCarros
            image={BotaoForms}
            openModal={() => openModal("seguradora")}
            closeModal={closeModal}
            showModal={showModal}
            tipo={tipoModal}
            onCreateCarro={handleCreateCarro}
          />

          {carrosSeguradora.map((carro) => (
            <CarrosItem
              key={carro.id}
              {...carro}
              openModal={() => openDeleteModal(carro.id, "seguradora")}
              openModalEdit={(id) => openModalEdit(id)}
              onUpdateCarro={handleUpdateCarro}
              closeModal={closeModal}
              showModal={showModal}
            />
          ))}
        </div>
      </article>

      <ModalConfirma
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => removerCarro(removerCarro)}
      />

      {carroParaEditar && (
        <ModalEditCarros
          isOpen={showEditModal}
          onClose={closeEditModal}
          tipo={carroParaEditar.type}
          onUpdateCarro={handleUpdateCarro}
          carroData={carroParaEditar}
        />
      )}
    </>
  );
}
