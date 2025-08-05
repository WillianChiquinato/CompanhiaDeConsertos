import fundo from "./assets/fundoMenu.png";
import logoEmpresa from "./assets/LogoTipo.png";
import home from "./assets/inicio.png";
import carros from "./assets/carros.png";
import funcionarios from "./assets/funcionario.png";
import formulario from "./assets/formulario.png";
import indicadores from "./assets/indicadores.png";
import sair from "./assets/sair.png";

import linkedin from "./assets/linkedin.png";
import instagram from "./assets/instagram.png";
import github from "./assets/github.png";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SideBarRepeat({ propsID, propsHref, propsImage, children }) {
  const location = useLocation();

  const isDespesas = propsHref.startsWith("/despesas/");
  const isActive = isDespesas
    ? location.pathname.startsWith("/despesas/")
    : location.pathname === propsHref;

  return (
    <div className="TopicosHeader">
      <Link
        id={propsID}
        to={propsHref}
        className={`
          containerTopico
          Efeito
          ${isActive ? 'linkDestaque' : ''}
        `}
      >
        <img className="IconTopico" src={propsImage} alt="" />
        <span className="textoTopico">{children}</span>
      </Link>
    </div>
  );
}

export default function SideBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("logged");
    navigate("/");
  };

  return (
    <>
      <aside className="HeaderContents">
        <div className="Header">
          <img className="imagemFundoHeader" src={fundo} alt="fundoMenu" />
          <div className="header-Title">
            <img className="imagemHeader" src={logoEmpresa} alt="Logotipo" />
            <span> Companhia de consertos </span>
          </div>
          <hr />

          <SideBarRepeat
            propsID="inicioHeader"
            propsHref="/inicio"
            propsImage={home}
            children="Início"
          />

          <SideBarRepeat
            propsID="carrosHeader"
            propsHref="/carros"
            propsImage={carros}
            children="Carros"
          />

          <SideBarRepeat
            propsID="funcionariosHeader"
            propsHref="/funcionarios"
            propsImage={funcionarios}
            children="Funcionários"
          />

          <SideBarRepeat
            propsID="despesasHeader"
            propsHref="/despesas/1"
            propsImage={formulario}
            children="Despesas"
          />

          <SideBarRepeat
            propsID="indicadoresHeader"
            propsHref="/indicadores"
            propsImage={indicadores}
            children="Indicadores"
          />

          <div className="TopicosHeader">
            <a className="containerTopico Efeito" href="/" onClick={() => {logout()}}>
              <img className="IconTopico" src={sair} alt="" />
              <span className="textoTopico">Sair</span>
            </a>
          </div>

          <div className="Footer">
            <span className="FotterTitle">@WillianChiquinato</span>
            <span className="FooterDirect">Todos os direitos reservados</span>
            <div className="LogoTiposFooter">
              <a href="https://www.linkedin.com/in/willian-de-sena-chiquinato-97b857260" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Insta" />
              </a>
              <a href="https://github.com/WillianChiquinato" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="Github" />
              </a>
              <a href="https://www.linkedin.com/in/willian-de-sena-chiquinato-97b857260" target="_blank" rel="noopener noreferrer">
                <img src={linkedin} alt="Linkedin" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
