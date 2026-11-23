import { useId } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaGithub, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import Reveal from '../Reveal/Reveal'
import logo from '../../assets/logo.png'
import './footer.css'

const redes_sociais = [
    { nome: 'GitHub', url: 'https://github.com/LiBraille', Icone: FaGithub },
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/company/libraille-projeto/', Icone: FaLinkedin },
    { nome: 'Instagram', url: 'https://www.instagram.com/projeto.libraille/', Icone: FaInstagram },
]

const colunas = [
    { titulo: 'Produto', links: [{ texto: 'Como funciona', to: '/produto' }] },
    { titulo: 'Empresa', links: [{ texto: 'Sobre nós', to: '/sobre' }] },
    {
        titulo: 'Suporte',
        links: [
            { texto: 'FAQ', to: '/#faq' },
            { texto: 'Contato', to: '/contato' },
        ],
    },
]

const termosLinks = [
    { texto: 'Política de privacidade', to: '/privacidade' },
    { texto: 'Termos de uso', to: '/termos' },
]

function Footer() {
    const baseId = useId()

    return (
        <footer className="footer-content" data-surface="dark">
            <div className="footer-top">
                <Reveal className="footer-about">
                    <Link to="/" className="footer-logo-link">
                        <img className="logo2" src={logo} alt="LiBraille - página inicial" />
                    </Link>
                    <p className="footer-slogan">Histórias que ganham relevo</p>

                    <address className="contact-items">
                        <a href="mailto:projeto.libraille@gmail.com" className="contact-item">
                            <IoMdMail className="contact-icon" aria-hidden="true" />
                            <span>projeto.libraille@gmail.com</span>
                        </a>
                        <div className="contact-item">
                            <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
                            <span>São Paulo - SP</span>
                        </div>
                    </address>

                    <ul className="social-icons" aria-label="Redes sociais">
                        {redes_sociais.map(({ nome, url, Icone }) => (
                            <li key={nome}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={`${nome} da LiBraille (abre em nova aba)`}
                                >
                                    <Icone className="social-icon" aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <div className="footer-navigation">
                    {colunas.map(({ titulo, links }, i) => {
                        const headingId = `${baseId}-${titulo}`
                        return (
                            <Reveal
                                as="nav"
                                key={titulo}
                                delay={i * 100}
                                className="footer-topics"
                                aria-labelledby={headingId}
                            >
                                <h2 id={headingId} className="footer-topics-title">{titulo}</h2>
                                <ul>
                                    {links.map(({ texto, to }) => (
                                        <li key={texto}>
                                            <Link to={to}>{texto}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        )
                    })}
                </div>
            </div>

            <Reveal variant="fade" className="footer-bottom">
                <p>© 2026 LiBraille. Todos os direitos reservados.</p>
                <ul className="footer-bottom-right">
                    {termosLinks.map(({ texto, to }) => (
                        <li key={texto}>
                            <Link to={to}>{texto}</Link>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </footer>
    )
}

export default Footer;