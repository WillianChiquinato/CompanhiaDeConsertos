import "./modalConfirm.css";

export default function ModalConfirma({ isOpen, onClose, onDelete }) {
  return (
    <>
      <div
        id="fade"
        className={`modal-fade ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />
      <div id="modalConfirm" className={`modal-container ${isOpen ? "show" : ""}`}>
        <div className="modal-Header-confirm">
          <h2 id="modal-title-confirm">Tem certeza que deseja retirar esse colaborador?</h2>
        </div>

        <div className="modal-confirm">
          <div className="modal-confirm-content">
            <span className="subTitle-confirm">
              **Isso excluirá do banco de dados**
            </span>
            <div className="buttons-confirm">
              <button className="buttons-Yes" id="fechar-modal" onClick={onDelete}>Sim</button>
              <button className="buttons-Not" id="fechar-modal" onClick={onClose}>Não</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
