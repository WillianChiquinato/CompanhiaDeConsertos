import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Carros from "./Components/Carros";
import Inicio from "./Components/Inicio";
import SideBar from "./Components/SideBar";
import Funcionarios from "./Components/Funcionarios";
import Despesas from "./Components/Despesas";

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
      

      {/* <div>
        <h1>Usuarios da API</h1>
        <ul>
          {dados.map((usuario, index) => (
            <li key={index}>{usuario.Login}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default App;
