import './CallToAction.css';

function CallToAction(){
    return(
        <section className="call-to-action">
            <div className="cta-content">
                <h2>Pronto para dar relevo
                às suas histórias?</h2>

                <p>Crie seu cadastro gratuito na plataforma ou entre em contato com a nossa equipe para parcerias ou dúvidas.</p>

                <div className="cta-buttons">
                    <button className="cta-primary">Criar conta gratuita</button>
                    <button className="cta-secondary"> Falar com a equipe</button>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;