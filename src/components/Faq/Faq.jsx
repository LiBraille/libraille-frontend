import { useId, useState } from 'react'
import Reveal from '../Reveal/Reveal'
import './faq.css'

const faqs = [
  {
    question: 'O que é o LiBraille?',
    answer: 'O LiBraille é uma solução inovadora projetada para transformar livros em experiências de leitura tátil, facilitando a acessibilidade de forma moderna e eficiente.',
  },
  {
    question: 'Como faço a aquisição do dispositivo?',
    answer: 'Você pode adquirir o LiBraille através do nosso site oficial, onde disponibilizamos informações sobre preços, planos e opções de compra.',
  },
  {
    question: 'Como faço a conversão dos arquivos para o formato braille?',
    answer: 'O LiBraille utiliza um software de conversão integrado que transforma arquivos digitais em braille, garantindo que o conteúdo seja acessível para leitores com deficiência visual.',
  },
  {
    question: 'O LiBraille é compatível com todos os tipos de arquivos?',
    answer: 'Não, no momento o LiBraille é compatível apenas com os formatos TXT e EPUB. Estamos trabalhando para expandir a compatibilidade com outros formatos no futuro.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)
  const baseId = useId()

  const toggleFAQ = (index) => {
    setOpenIndex((atual) => (atual === index ? null : index))
  }

  return (
    <section id="faq" className="faq-section" aria-labelledby={`${baseId}-titulo`}>
      <Reveal as="h2" id={`${baseId}-titulo`} className="faq-title">
        Perguntas Frequentes
      </Reveal>
      <Reveal as="p" className="faq-subtitle" delay={100}>
        Tire as suas dúvidas sobre o ecossistema LiBraille.
      </Reveal>

      <div className="faq-container">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const buttonId = `${baseId}-pergunta-${index}`
          const panelId = `${baseId}-resposta-${index}`

          return (
            <Reveal
              key={faq.question}
              delay={index * 90}
              className={`faq-item ${isOpen ? 'is-open' : ''}`}
            >
              <h3 className="faq-heading">
                <button
                  type="button"
                  id={buttonId}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`faq-answer-wrapper ${isOpen ? 'is-open' : ''}`}
              >
                <div className="faq-answer-inner">
                  <div className="faq-answer-box">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}