import { useState } from "react";
import carroImageParticular from "./assets/ImagemTeste.png";
import carroImageSeguradora from "./assets/image.png";
import Filtro from "./assets/Filtro.png";
import BotaoForms from "./assets/BotaoForms.png";
import Modal from '../../Components/Carros/modal/modal';
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

function CarrosItem({ title, image, type, owner, value }) {
  return (
    <div className="BoxCarrosList">
      <span className="TitleCarrosList">{title}</span>
      <img src={image} alt={title} />
      <span className="ConteudoCarrosList">Tipo: {type}</span>
      <span className="ConteudoCarrosList">Proprietário: {owner}</span>
      <span className="ConteudoCarrosList">Valor total (R$): {value}</span>

      <div className="ButtonsAlignCarrosList">
        <button className="DetalhesCarrosList">Detalhes</button>
        <button className="EditarCarrosList">Editar</button>
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
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />

          <CarrosItem
            title="Gol Quadrado"
            image={carroImageParticular}
            type="Particular"
            owner="Bruno Alves"
            value="3.000,00"
          />
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

          <CarrosItem
            title="Onix 2018"
            image={carroImageSeguradora}
            type="Seguradora"
            owner="Bruno Alves"
            value="3.000,00"
          />
        </div>
      </article>
    </>
  );
}
