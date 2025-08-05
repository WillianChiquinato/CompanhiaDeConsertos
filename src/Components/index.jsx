import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./Alerts/alertMessage";
import "./stylesLogin.css";

function Topicos({ title, value, onChange }) {
  return (
    <>
      <div className="TopicosContent">
        <span className="TopicosContentTitle">
          <u>{title}</u>:
        </span>
        <input
          type={title === "Senha" ? "password" : "text"}
          name={title}
          placeholder={
            title === "Login" ? "Digite seu login..." : "Digite sua senha..."
          }
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded login
    if (
      login === "murilo.canhao@CompanhiaDeConsertos.com" &&
      senha === "M&r#loÉV*ad#"
    ) {
      localStorage.setItem("logged", "true");
      navigate("/inicio");
    } else {
      setAlert({ message: "Login ou senha inválidos", type: "error" });
      // Remove o alerta após 3 segundos
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <>
      <div className="background">
        <div className="ContainerLogin">
          <div className="Titlelogin">
            <h1>Companhia de Consertos</h1>
          </div>
          <h4>Faça login para continuar</h4>
          <Topicos
            title="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Topicos
            title="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>

      {alert && <AlertMessage message={alert.message} type={alert.type} />}
    </>
  );
}
