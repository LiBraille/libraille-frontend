import logo from '../../assets/logo-dark-mode.png'
import moonIcon from '../../assets/icons8-lua.png'
import sunIcon from '../../assets/icons8-sol.png'
import { Link } from 'react-router-dom' // Importação essencial para a navegação
import './navbar.css'

function NavBar({ onIrParaLogin }) {
    return (
        <header>
            <nav id="navbar" aria-label="Barra de navegação do site">
                {/* Envolvemos o logo em um Link para que ele também volte para o Início */}
                <Link to="/">
                    <img src={logo} alt="Logo da empresa Libraille" aria-label="Logo da empresa Libraille" id="logo"/>
<<<<<<< HEAD
=======
<<<<<<< HEAD
                    <ul className="nav-links">
                        <li><a href="" className="nav-link" id='home-page'>Início</a></li>
                        <a href="" className="nav-link">Sobre</a>
                        <li><a href="" className="nav-link">Produto</a></li>
                        <li><a href="" className="nav-link">Contato</a></li>
                        </ul>
                        <div className="nav-buttons">
                            <div className="dark-light-mode-container">
                        <button id="dark-mode" aria-label="Alternar para modo escuro">
=======
>>>>>>> fc268e428735450090d53b700244be862d96ebf4
                </Link>
                
                <ul className="nav-links">
                    {/* Mudamos de <a> href para <Link> to pointing para as rotas do App.jsx */}
                    <li><Link to="/" className="nav-link" id='home-page' aria-label='Link para ir para a página inicial'>Início</Link></li>
                    <li><Link to="/sobre" className="nav-link" aria-label='Link para ir para a página de sobre'>Sobre</Link></li>
                    <li><Link to="/produto" className="nav-link" aria-label='Link para ir para a página de produto'>Produto</Link></li>
                    <li><Link to="/contato" className="nav-link" aria-label='Link para ir para a página de contato'>Contato</Link></li>
                </ul>

                <div className="nav-buttons">
                    <div className="dark-light-mode-container">
                        <button id="dark-mode" aria-label="Botão para alternar para modo escuro">
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> fc268e428735450090d53b700244be862d96ebf4
                            <img src={moonIcon} alt="Icone de lua para o modo escuro" />
                        </button>
                        <button id="light-mode" aria-label="Botão para alternar para modo claro">
                            <img src={sunIcon} alt="Icone de sol para o modo claro" />
                        </button>
                    </div>
                    
                    <button id="login-register" aria-label="Botão para realizar Login ou Cadastro" onClick={onIrParaLogin}>
                        Login/Cadastro
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default NavBar