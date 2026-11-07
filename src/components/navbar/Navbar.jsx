import logo from '../../assets/logo-dark-mode.png'
import moonIcon from '../../assets/icons8-lua.png'
import sunIcon from '../../assets/icons8-sol.png'
import './navbar.css'

function NavBar({onIrParaLogin}) {
    return (
        <>
            <header>
                <nav id="navbar" aria-label="Barra de navegação do site">
                    <img src={logo} alt="Logo da empresa Libraille" aria-label="Logo da empresa Libraille" id="logo"/>
                    <ul className="nav-links">
                        <li><a href="" className="nav-link" id='home-page'>Início</a></li>
                        <li><a href= "./about" className="nav-link">Sobre</a></li>
                        <li><a href="" className="nav-link">Produto</a></li>
                        <li><a href="" className="nav-link">Contato</a></li>
                        </ul>
                        <div className="nav-buttons">
                            <div className="dark-light-mode-container">
                        <button id="dark-mode" aria-label="Alternar para modo escuro">
                            <img src={moonIcon} alt="Icone de lua para o modo escuro" />
                        </button>
                        <button id="light-mode" aria-label="Alternar para modo claro">
                            <img src={sunIcon} alt="Icone de sol para o modo claro" />
                        </button>
                        </div>
                        <button id="login-register" aria-label="Faça Login ou Cadastro" onClick={onIrParaLogin} type="button">
                            Login/Cadastro
                        </button>
                        </div>
                </nav>
            </header>
        </>
    )
}

export default NavBar