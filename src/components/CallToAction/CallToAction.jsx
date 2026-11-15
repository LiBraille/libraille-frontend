import './CallToAction.css'
import { Link } from 'react-router-dom'


function CallToAction(){
    return(
        <section className="call-to-action">
            <div className="cta-content">
                <h2 className="cta-title">Doe para quem precisa</h2>

                <p className="cta-text">Contribua com a causa e ajude quem mais precisa. Doe um dispositivo e ajude a transformar vidas.</p>

                <div className="cta-buttons">
                     <Link to="/doacao" className="cta-button cta-button--primary">
                            Fazer doação
                        </Link>
                        <Link to="/contato" className="cta-button cta-button--secondary">
                            Falar com a equipe
                        </Link>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;