import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoDark from '../../assets/logo-dark-mode.png'
import logoLight from '../../assets/logo-light-mode.png' 
import moonIcon from '../../assets/icons8-lua.png'
import sunIcon from '../../assets/icons8-sol.png'
import './navbar.css'
import { useTheme } from '../../context/ThemeContext'

function NavBar({ onIrParaLogin }) {
    const { theme, setTheme } = useTheme()
    const logo = theme === 'dark' ? logoDark : logoLight
    const [menuAberto, setMenuAberto] = useState(false)
    const location = useLocation()

    // Fecha o menu ao trocar de página
    useEffect(() => {
        setMenuAberto(false)
    }, [location.pathname])

    // Fecha o menu com a tecla Esc
    useEffect(() => {
        const aoPressionarTecla = (e) => {
            if (e.key === 'Escape') setMenuAberto(false)
        }
        document.addEventListener('keydown', aoPressionarTecla)
        return () => document.removeEventListener('keydown', aoPressionarTecla)
    }, [])

    // Impede o scroll da página com o menu aberto
    useEffect(() => {
        document.body.classList.toggle('menu-open', menuAberto)
        return () => document.body.classList.remove('menu-open')
    }, [menuAberto])

    return (
        <header>
            <nav id="navbar" aria-label="Barra de navegação do site">
                {/* Envolvemos o logo em um Link para que ele também volte para o Início */}
                <Link to="/">
                    <img src={logo} alt="Logo da empresa Libraille" aria-label="Logo da empresa Libraille" id="logo"/>
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
                </Link>

                <button
                    type="button"
                    className="menu-toggle"
                    aria-expanded={menuAberto}
                    aria-controls="menu-principal"
                    aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                    onClick={() => setMenuAberto((aberto) => !aberto)}
                >
                    <span className="menu-toggle-bar" aria-hidden="true"></span>
                    <span className="menu-toggle-bar" aria-hidden="true"></span>
                    <span className="menu-toggle-bar" aria-hidden="true"></span>
                </button>

                <div
                    id="menu-principal"
                    className={`nav-menu ${menuAberto ? 'is-open' : ''}`}
                >
                    <ul className="nav-links">
                        <li><NavLink to="/" end className="nav-link">Início</NavLink></li>
                        <li><NavLink to="/sobre" className="nav-link">Sobre</NavLink></li>
                        <li><NavLink to="/produto" className="nav-link">Produto</NavLink></li>
                        <li><NavLink to="/contato" className="nav-link">Contato</NavLink></li>
                    </ul>

                <div className="nav-buttons">
                    <div className="dark-light-mode-container">
                        <button id="dark-mode" aria-label="Botão para alternar para modo escuro">
>>>>>>> dev
                            <img src={moonIcon} alt="Icone de lua para o modo escuro" />
                        </button>
                        <button id="light-mode" aria-label="Botão para alternar para modo claro">
                            <img src={sunIcon} alt="Icone de sol para o modo claro" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar