import { Link } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'
import './CallToAction.css'

function CallToAction() {
    return (
        <section className="call-to-action" aria-labelledby="cta-titulo">
            <Reveal className="cta-content" data-surface="dark">
                <h2 id="cta-titulo" className="cta-title">Doe para quem precisa</h2>

                <p className="cta-text">
                    Contribua com a causa e ajude quem mais precisa. Doe um dispositivo e
                    ajude a transformar vidas.
                </p>

                <div className="cta-buttons">
                    {/* btn, btn--primary e btn--ghost vêm do index.css */}
                    <Link to="/produto#comprar" className="btn btn--primary cta-button">
                        Fazer doação
                    </Link>
                    <Link to="/contato" className="btn btn--ghost cta-button">
                        Falar com a equipe
                    </Link>
                </div>
            </Reveal>
        </section>
    )
}

export default CallToAction