import './CallToAction.css'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'


function CallToAction(){
    return(
        <section className="call-to-action">
            <Reveal as="div" className="cta-content" data-surface="dark">
                <h2 className="cta-title">Doe para quem precisa</h2>

                <p className="cta-text">Contribua com a causa e ajude quem mais precisa. Doe um dispositivo e ajude a transformar vidas.</p>

                <div className="cta-buttons">
                     <Link to="/produto" className="cta-button cta-button--primary">
                            Fazer doação
                        </Link>
                        <Link to="/contato" className="cta-button cta-button--secondary">
                            Falar com a equipe
                        </Link>
                </div>
            </Reveal>
        </section>
    );
}

export default CallToAction