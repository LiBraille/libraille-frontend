import { FaEnvelope, FaPaperPlane, FaArrowRight } from 'react-icons/fa6'
import './contactForm.css'

const EMAIL = 'projeto.libraille@gmail.com'

export default function ContactForm() {
  // Este formulário NÃO envia a mensagem pelo site: ele abre o programa de e-mail
  // da pessoa, já com o texto pronto (é o que o "mailto:" faz).
  const aoEnviar = (event) => {
    event.preventDefault()

    const dados = new FormData(event.currentTarget)
    const nome = dados.get('nome')
    const email = dados.get('email')
    const mensagem = dados.get('mensagem')

    const assunto = encodeURIComponent(`Contato pelo site LiBraille - ${nome}`)
    const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`)

    window.location.href = `mailto:${EMAIL}?subject=${assunto}&body=${corpo}`
  }

  return (
    <section className="contact-form-section" aria-labelledby="contato-titulo">
      <div className="contact-form-card">
        <div className="contact-info">
          <p className="contact-label">FALE CONOSCO</p>

          <h1 id="contato-titulo">
            Entre em contato para <span>saber mais.</span>
          </h1>

          <p className="contact-description">
            Tem alguma dúvida ou deseja conhecer melhor o LiBraille? Estamos aqui para ajudar!
            Envie sua mensagem e teremos prazer em conversar com você.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              {/* aria-hidden: o ícone é só enfeite, o texto ao lado já diz tudo */}
              <span className="form-icon" aria-hidden="true"><FaEnvelope /></span>
              <div>
                <h3>E-mail</h3>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>

            <div className="contact-detail">
              <span className="form-icon" aria-hidden="true"><FaPaperPlane /></span>
              <div>
                <h3>Atendimento</h3>
                <p>Envie sua mensagem pelo formulário.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="form-heading">
            <h2>Envie uma mensagem</h2>
            <p>Preencha os campos abaixo.</p>
          </div>

          <form className="contact-form" onSubmit={aoEnviar}>
            <div className="field">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                autoComplete="name"
                placeholder="Informe seu nome"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Informe seu e-mail"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows="5"
                placeholder="Escreva aqui como podemos te ajudar"
                required
              />
            </div>

            <button type="submit" className="btn btn--primary contact-button">
              Enviar mensagem
              <FaArrowRight aria-hidden="true" />
            </button>

            <p className="contact-note">
              Ao enviar, abrimos o seu programa de e-mail com a mensagem pronta. Se ele não abrir,
              escreva direto para {EMAIL}.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}