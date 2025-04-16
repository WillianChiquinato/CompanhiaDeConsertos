import fundo from './assets/fundoMenu.png';
import logoEmpresa from './assets/LogoTipo.png';
import home from './assets/inicio.png';
import carros from './assets/carros.png';
import funcionarios from './assets/funcionario.png';
import formulario from './assets/formulario.png';
import indicadores from './assets/indicadores.png';
import sair from './assets/sair.png';

import linkedin from './assets/linkedin.png';
import instagram from './assets/instagram.png';
import github from './assets/github.png';
import './styles.css';

export default function SideBar() {
    return (
        <>
            <aside className="HeaderContents">
                <div className="Header">
                    <img className="imagemFundoHeader" src={fundo} alt="fundoMenu" />
                    <div className="header-Title">
                        <img className="imagemHeader" src={logoEmpresa} alt="Logotipo" />
                        <span> Companhia de consertos</span>
                    </div>
                    <hr />

                    <div className="TopicosHeader">
                        <a className="containerTopico Efeito" id="inicioHeader" href="index.html">
                            <img className="IconTopico" src={home} alt="" />
                            <span className="textoTopico">Início</span>
                        </a>
                    </div>

                    <div className="TopicosHeader">
                        <a className="containerTopico Efeito" id="carrosHeader" href="carros.html">
                            <img className="IconTopico" src={carros} alt="" />
                            <span className="textoTopico">Carros</span>
                        </a>
                    </div>

                    <div className="TopicosHeader">
                        <a className="containerTopico Efeito" id="funcionariosHeader" href="funcionarios.html">
                            <img className="IconTopico" src={funcionarios} alt="" />
                            <span className="textoTopico">Funcionários</span>
                        </a>
                    </div>

                    <div className="TopicosHeader">
                        <a className="containerTopico Efeito" id="despesasHeader" href="despesas.html">
                            <img className="IconTopico" src={formulario} alt="" />
                            <span className="textoTopico">Despesas</span>
                        </a>
                    </div>

                    <div className="TopicosHeader">
                        <a className="containerTopico Efeito" id="indicadoresHeader" href="indicadores.html">
                            <img className="IconTopico" src={indicadores} alt="" />
                            <span className="textoTopico">Indicadores</span>
                        </a>
                    </div>

                    <div className="TopicosHeader">
                        <a className="containerTopico Efeito" href="">
                            <img className="IconTopico" src={sair} alt="" />
                            <span className="textoTopico">Sair</span>
                        </a>
                    </div>

                    <div className="Footer">
                        <span className="FotterTitle">@WillianChiquinato</span>
                        <span className="FooterDirect">Todos os direitos reservados</span>
                        <div className="LogoTiposFooter">
                            <img src={instagram} alt="Insta" width="40" />
                            <img src={github} alt="Github" width="40" />
                            <img src={linkedin} alt="Linkedin" width="40" />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}