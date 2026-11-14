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
        <header id="main-header">
            <nav id="navbar" aria-label="Navegação principal">
                <Link to="/" className="logo-link">
                    {/* alt já descreve a imagem; aria-label no img é redundante */}
                    <img src={logo} alt="Libraille - página inicial" id="logo" />
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
                        <div className="dark-light-mode-container" role="group" aria-label="Tema do site">
                            <button type="button" id="dark-mode" aria-label="Modo escuro" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
                                <img src={moonIcon} alt="" />
                            </button>
                            <button type="button" id="light-mode" aria-label="Modo claro" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
                                <img src={sunIcon} alt="" />
                            </button>
                        </div>

                        <button type="button" id="login-register" onClick={onIrParaLogin}>
                            Login/Cadastro
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar