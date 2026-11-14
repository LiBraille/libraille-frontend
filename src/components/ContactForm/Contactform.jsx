import "./contactForm.css";

export default function ContactForm(){
    const handleSubmit = (event) =>{
        event.preventDefault();

        const formData = new  FormData(event.currentTarget);

        const nome = formData.get("nome");
        const email = formData.get("email");
        const mensagem = formData.get("mensagem");
        const assunto = encodeURIComponent(`Contato pelo site Libraille - ${nome}`);
        const corpo = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`);

        window.location.href = `mailto:projeto.libraille@gmail.com?subject=${assunto}&body=${corpo}`;
    };

    return (
        <section className="contact-form-section">
            <div className="contact-form-card">
                <div className="contact-info">
                    <span className="contact-label">FALE CONOSCO</span>

                    <h1>Entre em contato para <span>saber mais.</span></h1>

                    <p className="contact-description">Tem alguma dúvida ou deseja conhecer melhor o Libraille? Estamos aqui para ajudar! Envie sua mensagem e teremos prazer em conversar com você.</p>

                    <div className="contact-details">
                        <div className="contact-detail">
                            <div className="form-icon">@</div>
                            <div>
                                <h3>Email</h3>

                                <a href="mailto:projeto.libraille@gmail.com">projeto.libraille@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-detail">
                        <div className="form-icon">↗</div>
                        <div>
                            <h3>Atendimento</h3>
                            <p>Envie sua mensagem pelo formulário.</p>
                        </div>
                    </div>
                </div>
            

            <div className="contact-form-container">
                <div className="form-heading">
                    <h2>Envie uma mensagem</h2>
                    <p>Preencha os campos abaixo</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" placeholder="Informe seu nome" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input type="email" id="email" name="email" placeholder="Informe seu email" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensagem">Mensagem</label>
                        <textarea id="mensagem" name="mensagem" placeholder="Escreva aqui como podemos te ajudar" rows="5" required/>
                    </div>

                    <button type="submit" className="contact-button">Enviar mensagem <span>→</span></button>
                </form>
            </div>
        </div>
        </section>
    );
}