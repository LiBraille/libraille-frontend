import './footer.css'
import logo2 from '../../assets/logo2.png'
import localIcon from '../../assets/local.png'
import emailIcon from '../../assets/email-icon.png'
import githubIcon from '../../assets/Github.png'
import instagramIcon from '../../assets/instagram.png'
import linkedinIcon from '../../assets/LinkedIn.png'
import phoneIcon from '../../assets/telefone.png'

function Footer() {
    return (
        <>
            <footer className="footer-content">
                <div className="footer-top">
                <div className="footer-section about">
                    <img className="logo2" src={logo2} alt="Logo alternativa da empresa" />
                    <p>Histórias que ganham relevo</p>
                    <div className="contact-items">
                        <div className="contact-item">
                        <img className="contact-icon" src={emailIcon} alt="Icone de email" />
                        <span>contato@libraille.com</span>
                        </div>
                        <div className="contact-item">
                            <img className="contact-icon" src={phoneIcon} alt="Icone de telefone" />
                            <span>(11) 99999-9999</span>
                        </div>
                        <div className="contact-item"> <img className="contact-icon" src={localIcon} alt="Icone de localização" />
                        <a href="https://www.google.com/maps?q=São+Paulo+-+SP,+Brasil" target="_blank" rel="noopener noreferrer">São Paulo - SP</a>
                        </div>
                    </div>
                    <div className="social-icons">
                        <a href=""><img src={githubIcon} alt="Icone da logo do GitHub" className='github-icon-img'/></a>
                        <a href=""><img src={linkedinIcon} alt="Icone da logo do LinkedIn" className='linkedin-icon-img'/></a>
                        <a href=""><img src={instagramIcon} alt="Icone da logo do Instagram" className='instagram-icon-img'/></a>
                    </div>
                    </div>
                    <div className='footer-navigation'>
                        <nav className='footer-topics'>
                        <h2>Produto</h2>
                        <ul>
                            <li><a href="">Como Funciona</a></li>
                        </ul>
                        </nav>
                    <nav className='footer-topics'>
                        <h2>Empresa</h2>
                        <ul>
                            <li><a href="">Sobre nós</a></li>
                        </ul>
                        </nav>
                    <nav className='footer-topics'>
                        <h2>Suporte</h2>
                        <ul>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">Contato</a></li>
                        </ul>
                    </nav>
                    </div>
                    </div>
                    <hr/>
                    <div className="footer-bottom">
                    <p>©LiBraille. Todos os direitos reservados.</p>
                    <div className='footer-bottom-right'>
                    <a href="#">Política de privacidade</a>
                    <a href="#">Termos de uso</a>
                    </div>
                    </div>
                
            </footer>
        </>
    )
}

export default Footer