import { useId } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaGithub, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import logo from '../../assets/logo.png'
import './footer.css'

const redes_sociais = [
    { nome: 'GitHub', url: 'https://github.com/', Icone: FaGithub },
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/', Icone: FaLinkedin },
    { nome: 'Instagram', url: 'https://www.instagram.com/', Icone: FaInstagram },
]

const colunas = [
    {
        titulo: 'Produto',
        links: [{ texto: 'Como funciona', to: '/produto' }],
    },
    {
        titulo: 'Empresa',
        links: [{ texto: 'Sobre nós', to: '/sobre' }],
    },
    {
        titulo: 'Suporte',
        links: [
            { texto: 'FAQ', to: '/#faq' },
            { texto: 'Contato', to: '/contato' },
        ],
    },
]


function Footer() {
    const baseId = useId() //useId é um hook do React que gera um identificador único para cada instância do componente. Isso é útil para associar elementos de forma acessível, como títulos e listas de links.
    return (
        <>
            <footer className="footer-content">
                <div className="footer-top">
                    <div className="footer-about">
                        <Link to="/" className="footer-logo-link">
                            <img className="logo2" src={logo} alt="LiBraille - página inicial" />
                        </Link>
                        <p className="footer-slogan">Histórias que ganham relevo</p>
                        <address className="contact-items">
                            <a href="mailto:contato@libraille.com" className="contact-item">
                                <IoMdMail className="contact-icon" aria-hidden="true" />
                                <span>contato@libraille.com</span>
                            </a>
                            <div className="contact-item">
                                <FaPhoneAlt className="contact-icon" aria-hidden="true" />
                                <span>(11) 99999-9999</span>
                            </div>
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
                    </div>
                    <div className="footer-navigation">
                        {colunas.map(({ titulo, links }) => {
                            //colunas é um array de objetos que contém o título e os links de cada seção do rodapé. O método map() é usado para iterar sobre cada coluna e renderizar a estrutura de navegação correspondente.
                            const headingId = `${baseId}-${titulo}`
                            //headingId é usado para associar o título da seção de navegação com a lista de links, melhorando a acessibilidade.
                            return (
                                <nav key={titulo} className="footer-topics" aria-labelledby={headingId}>
                                    <h2 id={headingId} className="footer-topics-title">{titulo}</h2>
                                    <ul>
                                        {links.map(({ texto, to }) => (
                                            //links é um array que contém o texto e o destino de cada link. O método map() é usado para iterar sobre cada link e renderizar os elementos <li> correspondentes.
                                            //texto é o texto do link e to é o destino do link.
                                            <li key={texto}>
                                                <Link to={to}>{texto}</Link>

                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )
                        })}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} LiBraille. Todos os direitos reservados.</p>
                    <ul className="footer-bottom-right">
                        <li><Link to="/privacidade">Política de privacidade</Link></li>
                        <li><Link to="/termos">Termos de uso</Link></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer