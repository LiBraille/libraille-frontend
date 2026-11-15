import { useState } from "react"
import "./faq.css"

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "O que é o LiBraille?",
      answer: "O LiBraille é uma solução inovadora projetada para transformar livros em experiências de leitura tátil, facilitando a acessibilidade de forma moderna e eficiente.",
    },
    {
      question: "Como posso entrar em contacto com o suporte?",
      answer: "Pode entrar em contacto com a nossa equipa através do e-mail suporte@libraille.com ou utilizando o widget de chat disponível no canto inferior da página.",
    },
    {
      question: "O projeto é acessível para todos?",
      answer: "Sim, o nosso principal objetivo é democratizar o acesso à leitura tátil, garantindo inclusão e facilidade de uso para todos os públicos.",
    },
    {
      question: "Posso solicitar demonstrações personalizadas?",
      answer: "Sim, oferecemos apresentações e demonstrações para instituições e parceiros interessados em implementar a tecnologia LiBraille.",
    },
  ];

  return (
    <section className="faq-section">
      <h2 className="faq-title">Perguntas Frequentes</h2>
      <p className="faq-subtitle">Tire todas as suas dúvidas sobre o ecossistema LiBraille.</p>

      <div className="faq-container">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={`faq-item ${isOpen ? "is-open" : ""}`}>
              <button onClick={() => toggleFAQ(index)} className="faq-question-btn">
                <span>{faq.question}</span>
                {/* O elemento icon desenha o + e roda para x com CSS */}
                <div className="faq-icon" />
              </button>

              <div className={`faq-answer-wrapper ${isOpen ? "is-open" : ""}`}>
                <div className="faq-answer-inner">
                  <div className="faq-answer-box">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}