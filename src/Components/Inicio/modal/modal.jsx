import './modal.css';

export default function ModalExtracao({ isOpen, onClose }) {
    return (
        <>
            <div id="fade" className={`modal-fade ${isOpen ? "show" : ""}`} onClick={onClose} />
            <div id="modalExtrair" className={`modal-container ${isOpen ? "show" : ""}`} >
                <div className="modal-Header">
                    <h2 id="modal-title">EXTRAÇÃO</h2>
                    <button id="fechar-modal" className="button" onClick={onClose}>Sair</button>
                </div>

                <div className="modal-conteudo">
                    <div className="TitulosFooter">
                        <span className="footerTitle">
                            Extrair arquivos .csv para a concretização e reunião com a equipe
                        </span>
                    </div>

                    <article className="OutAlignModal">
                        <div className="MesAnoModal">
                            <span className="MesAnoTitle"> MÊS / ANO </span>
                            <div className="MesAnoAlignModal">
                                <select id="monthSelect" defaultValue="">
                                    <option value="" disabled>Select month</option>
                                    <option value="01">Janeiro</option>
                                    <option value="02">Fevereiro</option>
                                    <option value="03">Março</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Maio</option>
                                    <option value="06">Junho</option>
                                    <option value="07">Julho</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>

                                <select id="yearSelect" defaultValue="">
                                    <option value="" disabled>Year</option>
                                    {/* Aqui você pode popular dinamicamente com JS, se quiser */}
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                            </div>
                        </div>
                    </article>

                    <div className="modal-Input">
                        <span className="MesAnoTitle"> NOME DO ARQUIVO </span>
                        <input type="text" placeholder="Digite algo aqui" />
                        <button className="ButaoExtractModal"> Extrair </button>
                    </div>
                </div>
            </div >
        </>
    );
}
