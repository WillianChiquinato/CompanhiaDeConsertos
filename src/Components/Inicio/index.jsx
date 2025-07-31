import { useEffect, useState } from 'react';
import Modal from '../../Components/Inicio/modal/modal';

import imagemInicio1 from './assets/ImagemInicio.jpeg';
import imagemInicio2 from './assets/ImagemInicio1.jpeg';
import imagemInicio3 from './assets/ImagemInicio2.jpeg';
import imagemInicio4 from './assets/ImagemInicio3.jpeg';
import './styles.css';
import './slider.css';

export default function Inicio() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [contador, setContador] = useState(1);

    // Roda a cada 2 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            setContador((prev) => (prev >= 4 ? 1 : prev + 1));
        }, 2500);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <>
            <article className="Inicio">
                <span className="TituloInicio"> INICIO </span>
                <hr className="TituloHR" />

                <div className="sliderImagens">
                    <div className="modal-Image-slide">
                        {[1, 2, 3, 4].map((num) => (
                            <input
                                key={num}
                                type="radio"
                                name="raio-btn"
                                id={`radio${num}`}
                                checked={contador === num}
                                readOnly
                            />
                        ))}

                        {/* As tres imagens */}
                        <div className="slider-box-image primeiroSlide">
                            <img src={imagemInicio1} alt="Imagem do Modal" />
                        </div>

                        <div className="slider-box-image">
                            <img src={imagemInicio2} alt="Imagem do Modal" />
                        </div>

                        <div className="slider-box-image">
                            <img src={imagemInicio3} alt="Imagem do Modal" />
                        </div>

                        <div className="slider-box-image">
                            <img src={imagemInicio4} alt="Imagem do Modal" />
                        </div>

                        {/*  navegação automatica */}
                        <div className="navigationAuto">
                            <div className="auto-btn1"></div>
                            <div className="auto-btn2"></div>
                            <div className="auto-btn3"></div>
                            <div className="auto-btn4"></div>
                        </div>

                        {/* navegação manual */}
                        <div className="navigationManual">
                            {[1, 2, 3, 4].map((num) => (
                                <label
                                    key={num}
                                    htmlFor={`radio${num}`}
                                    className="manual-btn"
                                    onClick={() => setContador(num)}
                                ></label>
                            ))}
                        </div>
                    </div>
                </div>

                <span className="ConteudoExpressao">“A melhor mecânica do ABC paulista, companhia de consertos vem para o
                    mercado com o objetivo de revolucionar a area de atuação, trazendo qualidade, velocidade e
                    tecnologia”</span>

                <article className="OutAlign">
                    <button onClick={openModal} className="ButaoExtract">EXTRAIR</button>
                    <span>Extração de informações para documento em EXCEL</span>

                    <Modal isOpen={showModal} onClose={closeModal} />
                </article>
            </article>
        </>
    )
}
