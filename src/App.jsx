import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Components/index.jsx";
import Carros from "./Components/Carros";
import Inicio from "./Components/Inicio";
import SideBar from "./Components/SideBar";
import Funcionarios from "./Components/Funcionarios";
import Despesas from "./Components/Despesas";
import Indicadores from "./Components/Indicadores";

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

function PrivateRoute({ children }) {
  const isLogged = localStorage.getItem("logged") === "true";
  return isLogged ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<LayoutPadrao />}>
            <Route path="/inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
            <Route path="/carros" element={<PrivateRoute><Carros /></PrivateRoute>} />
            <Route path="/funcionarios" element={<PrivateRoute><Funcionarios /></PrivateRoute>} />
            <Route path="/despesas/:id" element={<PrivateRoute><Despesas /></PrivateRoute>} />
            <Route path="/indicadores" element={<PrivateRoute><Indicadores /></PrivateRoute>} />
          </Route>

          <Route path="*" element={<div>Pagina nao encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
