import "./styles.css";

export default function ListaDespesas({
  equipamentos,
  contas,
  outros,
  toggleAccordion,
  selectedAccordion,
  handleDeleteDespesa,
}) {
  return (
    <>
      <article className="DespesaLista">
        <span className="TituloDespesaLista"> Lista de Despesas </span>
        <hr className="TituloHRLista" />

        <div className="DespesaListaContainer">
          <div className="DespesaContent">
            <div className="accordionDespesas">
              <div className="containerDespesaItem">
                <div className="wrapperDespesasTopicos">
                  <div className="titleContent">
                    <div className="accordionTitle">Equipamentos</div>
                    <button onClick={() => toggleAccordion(0)}>
                      {selectedAccordion === 0 ? "-" : "+"}
                    </button>
                  </div>
                  <div className="fundoConteudoItem">
                    <div
                      className={
                        selectedAccordion === 0 ? "activeAcc show" : "activeAcc"
                      }
                    >
                      {equipamentos.map((despesa, index) => (
                        <div className="accordionItem" key={index}>
                          <span className="itemNome">
                            <u>{despesa.NomeResponsavel}</u>
                          </span>
                          <li>
                            <span>
                              <strong>Data: </strong>
                              {new Date(despesa.Data).toLocaleDateString()}
                            </span>
                            <span>
                              <strong>R$ </strong>
                              {(parseFloat(despesa.Valor) || 0).toFixed(2)}
                            </span>
                            <span>
                              <strong>Descrição: </strong>
                              {despesa.Descricao}
                            </span>

                            <button
                              className="btnDeletar"
                              onClick={() =>
                                handleDeleteDespesa(despesa.Id_Despesa)
                              }
                            >
                              Deletar
                            </button>
                          </li>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="wrapperDespesasTopicos">
                  <div className="titleContent">
                    <div className="accordionTitle">Contas</div>
                    <button onClick={() => toggleAccordion(1)}>
                      {selectedAccordion === 1 ? "-" : "+"}
                    </button>
                  </div>
                  <div className="fundoConteudoItem">
                    <div
                      className={
                        selectedAccordion === 1 ? "activeAcc show" : "activeAcc"
                      }
                    >
                      {contas.map((despesa, index) => (
                        <div className="accordionItem" key={index}>
                          <span className="itemNome">
                            <u>{despesa.NomeResponsavel}</u>
                          </span>
                          <li>
                            <span>
                              <strong>Data: </strong>
                              {new Date(despesa.Data).toLocaleDateString()}
                            </span>
                            <span>
                              <strong>R$ </strong>
                              {(parseFloat(despesa.Valor) || 0).toFixed(2)}
                            </span>
                            <span>
                              <strong>Descrição: </strong>
                              {despesa.Descricao}
                            </span>

                            <button
                              className="btnDeletar"
                              onClick={() =>
                                handleDeleteDespesa(despesa.Id_Despesa)
                              }
                            >
                              Deletar
                            </button>
                          </li>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="wrapperDespesasTopicos">
                  <div className="titleContent">
                    <div className="accordionTitle">Outros</div>
                    <button onClick={() => toggleAccordion(2)}>
                      {selectedAccordion === 2 ? "-" : "+"}
                    </button>
                  </div>
                  <div className="fundoConteudoItem">
                    <div
                      className={
                        selectedAccordion === 2 ? "activeAcc show" : "activeAcc"
                      }
                    >
                      {outros.map((despesa, index) => (
                        <div className="accordionItem" key={index}>
                          <span className="itemNome">
                            <u>{despesa.NomeResponsavel}</u>
                          </span>
                          <li>
                            <span>
                              <strong>Data: </strong>
                              {new Date(despesa.Data).toLocaleDateString()}
                            </span>
                            <span>
                              <strong>R$ </strong>
                              {(parseFloat(despesa.Valor) || 0).toFixed(2)}
                            </span>
                            <span>
                              <strong>Descrição: </strong>
                              {despesa.Descricao}
                            </span>

                            <button
                              className="btnDeletar"
                              onClick={() =>
                                handleDeleteDespesa(despesa.Id_Despesa)
                              }
                            >
                              Deletar
                            </button>
                          </li>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
