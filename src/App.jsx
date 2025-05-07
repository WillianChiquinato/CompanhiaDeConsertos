import "./App.css";
import Carros from "./Components/Carros";
import Inicio from "./Components/Inicio";
import SideBar from "./Components/SideBar";
import { useState, useEffect } from "react";

function App() {
  const [dados, setDados] = useState([]);

  // Função para buscar os dados da API, no caso dos usuários.
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/usuario');
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="container">
      {/* <SideBar />
      {/* <Inicio /> */}
      {/* <Carros /> */}
      <div>
        <h1>Usuarios da API</h1>
        <ul>
          {dados.map((usuario, index) => (
            <li key={index}>{usuario.Login}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
