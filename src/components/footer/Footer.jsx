import './footer.css'
import logo2 from '../../assets/logo2.png'
import visit from '../../assets/visit.png'
import mail from '../../assets/mail.png'
import githubIcon from '../../assets/Github.png'
import instagramIcon from '../../assets/instagram.png'
import linkedinIcon from '../../assets/LinkedIn.png'

function Footer() {
    return (
        <>
            <footer>
                <div className="footer-top">
                    <div className='img_slogan'>
                        <img className="logo2" src={logo2} alt="Logo2" />
                        <p>Histórias que ganham relevo</p>
                       <div className="mail-visit">
                            <div className="contact-item">
                                <img className="mail" src={mail} alt="mail-icon" />
                                <p>libraille@gmail.com</p>
                            </div>
                            <div className="contact-item">
                                <img className="visit" src={visit} alt="visit-icon" />
                                <a 
                                    href="https://www.google.com/maps?q=São+Paulo+-+SP,+Brasil" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    São Paulo - SP
                                </a>
                            </div>
                        </div>
                        <div className="social-icons">
                            <a href="https://github.com/LiBraille" target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="GitHub" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={linkedinIcon} alt="LinkedIn" />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={instagramIcon} alt="Instagram" />
                            </a>
                        </div>
                    </div>
                    <div className='footer-topics'>
                        <h2>Produto</h2>
                        <ul>
                            <li><a href="">Como Funciona</a></li>
                        </ul>
                    </div>
                    <div className='footer-topics'>
                        <h2>Empresa</h2>
                        <ul>
                            <li><a href="">Sobre nós</a></li>
                        </ul>
                    </div>
                    <div className='footer-topics'>
                        <h2>Suporte</h2>
                        <ul>
                            <li><a href="">FAQ</a></li>
                            <li><a href="">Contato</a></li>
                        </ul>
                    </div>
                </div>

                <hr />

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