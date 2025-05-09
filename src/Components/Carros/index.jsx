import { useState } from "react";
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

function BotaoAddCarros({ image, openModal, closeModal, showModal }) {
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

      <Modal isOpen={showModal} onClose={closeModal} />
    </>
  );
}

export default function Carros() {
  const [showModal, setShowModal] = useState(false);
  const [carroParaRemover, setCarroParaRemover] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [carrosParticulares, setCarrosParticulares] = useState([
    {
      id: 1,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageParticular,
      type: "Particular",
    },
    {
      id: 2,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageParticular,
      type: "Particular",
    },
    {
      id: 3,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageParticular,
      type: "Particular",
    },
    {
      id: 4,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageParticular,
      type: "Particular",
    },
    {
      id: 5,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageParticular,
      type: "Particular",
    },
    {
      id: 6,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageParticular,
      type: "Particular",
    },
  ]);

  const [carrosSeguradora, setCarrosSeguradora] = useState([
    {
      id: 1,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageSeguradora,
      type: "Particular",
    },
    {
      id: 2,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageSeguradora,
      type: "Particular",
    },
    {
      id: 3,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageSeguradora,
      type: "Particular",
    },
    {
      id: 4,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageSeguradora,
      type: "Particular",
    },
    {
      id: 5,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageSeguradora,
      type: "Particular",
    },
    {
      id: 6,
      title: "Gol",
      owner: "Bruno Alves",
      value: "3.000,00",
      image: carroImageSeguradora,
      type: "Particular",
    },
  ]);

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
  console.log(`Carro ${carroParaRemover.id} removido da lista ${carroParaRemover.tipo}`);
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
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
          />

          {carrosParticulares.map((carro) => (
            <CarrosItem key={carro.id} {...carro} openModal={() => openDeleteModal(carro.id, "particular")} />
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
            openModal={openModal}
            closeModal={closeModal}
            showModal={showModal}
          />

          {carrosSeguradora.map((carro) => (
            <CarrosItem key={carro.id} {...carro} openModal={() => openDeleteModal(carro.id, "seguradora")} />
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
