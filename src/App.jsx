import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Carros from "./Components/Carros";
import Inicio from "./Components/Inicio";
import SideBar from "./Components/SideBar";
import Funcionarios from "./Components/Funcionarios";
import Despesas from "./Components/Despesas";

export function FormatadorMoeda({ valor }) {
  const formatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

  return <span>{formatado}</span>;
}

function LayoutPadrao() {
  return (
    <div className="container">
      <SideBar />
      <Outlet />
    </div>
  );
}

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPadrao />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/carros" element={<Carros />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/despesas/:id" element={<Despesas />} />
          </Route>

          <Route path="*" element={<div>Pagina nao encontrada</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
