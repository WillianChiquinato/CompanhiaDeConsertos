import { useState, useEffect } from "react";
import carroImageParticular from "./assets/ImagemTeste.png";
import carroImageSeguradora from "./assets/image.png";
import Filtro from "./assets/Filtro.png";
import BotaoForms from "./assets/BotaoForms.png";
import Modal from "../../Components/Carros/modal/modal";
import ModalConfirma from "../../Components/Carros/modalConfirm/modalConfirma";
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

function CarrosItem({ title, image, type, owner, value, id, openModal }) {
  return (
    <div className="BoxCarrosList">
      <span className="TitleCarrosList">{title}</span>
      <img src={image} alt={title} />
      <span className="ConteudoCarrosList">Tipo: {type}</span>
      <span className="ConteudoCarrosList">Proprietário: {owner}</span>
      <span className="ConteudoCarrosList">Valor total (R$): {value}</span>

      <div className="ButtonsAlignCarrosList">
        <button className="DetalhesCarrosList">Editar</button>
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

function BotaoAddCarros({ image, openModal, closeModal, showModal, tipo }) {
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

      <Modal isOpen={showModal} onClose={closeModal} tipo={tipo} />
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

  //Segundo paremetro do useEffect é quando o array estiver alguma mudança ele ira renderizar novamente.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Buscar tipos
        const tiposResponse = await fetch(
          "http://localhost:8080/api/tipocarro"
        );
        const tiposData = await tiposResponse.json();

        const tiposLookup = {};
        tiposData.forEach((tipo) => {
          tiposLookup[tipo.Id_TipoCarro] = tipo.Descricao;
        });

        // 2. Buscar carros
        const carrosResponse = await fetch("http://localhost:8080/api/carro");
        const carrosData = await carrosResponse.json();

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
        }));

        
        // Separar em particulares e seguradora
        const particulares = carrosComTipo.filter(
          (carro) => carro.type === "particular"
        );
        const seguradora = carrosComTipo.filter(
          (carro) => carro.type === "seguradora"
        );

        setCarrosParticulares(particulares);
        setCarrosSeguradora(seguradora);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (tipo) => {
    setTipoModal(tipo);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const openDeleteModal = (id, tipo) => {
    setCarroParaRemover({ id, tipo });
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCarroParaRemover(null);
  };

  const removerCarro = () => {
    if (!carroParaRemover) return;

    if (carroParaRemover.tipo === "particular") {
      setCarrosParticulares((prev) =>
        prev.filter((carro) => carro.id !== carroParaRemover.id)
      );
    } else if (carroParaRemover.tipo === "seguradora") {
      setCarrosSeguradora((prev) =>
        prev.filter((carro) => carro.id !== carroParaRemover.id)
      );
    }

    setShowDeleteModal(false);
    console.log(
      `Carro ${carroParaRemover.id} removido da lista ${carroParaRemover.tipo}`
    );
  };

  // console.log("Carros Particulares:", carrosParticulares);
  // console.log("Carros Seguradora:", carrosSeguradora);

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
          />

          {carrosParticulares.map((carro) => (
            <CarrosItem
              key={carro.id}
              {...carro}
              openModal={() => openDeleteModal(carro.id, "particular")}
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
          />

          {carrosSeguradora.map((carro) => (
            <CarrosItem
              key={carro.id}
              {...carro}
              openModal={() => openDeleteModal(carro.id, "seguradora")}
            />
          ))}
        </div>
      </article>

      <ModalConfirma
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={() => removerCarro(removerCarro)}
      />
    </>
  );
}
