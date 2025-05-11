import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

export default function Despesas() {
  const parametros = useParams();
  const { id } = parametros;
  const navigate = useNavigate();

  console.log(parametros);
  return (
    <>
      <h1 className="Depesas"> OLA DESPESA {id} </h1>

      <div>
        <button onClick={() => navigate('/despesas/1')}> Forms01 </button>
        <button onClick={() => navigate('/despesas/2')}> Forms02 </button>
        <button onClick={() => navigate('/despesas/3')}> Forms03 </button>
      </div>
    </>
  );
}
