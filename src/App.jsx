import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Carros from "./Components/Carros";
import Inicio from "./Components/Inicio";
import SideBar from "./Components/SideBar";
import Funcionarios from "./Components/Funcionarios";
import Despesas from "./Components/Despesas";
// import { useState, useEffect } from "react";

function LayoutPadrao() {
  return (
    <div className="container">
      <SideBar />
      <Outlet />
    </div>
  );
}

function App() {
  // const [dados, setDados] = useState([]);

  // Função para buscar os dados da API, no caso dos usuários.
  // useEffect(() => {
  //   const fetchUsuarios = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/usuario');
  //       if (!response.ok) throw new Error('Erro ao buscar dados');
  //       const data = await response.json();
  //       setDados(data);
  //     } catch (error) {
  //       console.error('Erro ao buscar usuários:', error);
  //     }
  //   };

  //   fetchUsuarios();
  // }, []);

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
