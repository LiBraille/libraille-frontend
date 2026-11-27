import { FaUserCheck, FaFileArrowUp, FaUsb, FaHandPointUp } from 'react-icons/fa6'
import Reveal from '../Reveal/Reveal'
import './productSteps.css'

// Para mudar um passo, edite esta lista: a tela se atualiza sozinha.
const PASSOS = [
    {
        titulo: 'Ative sua conta',
        texto: 'Depois de adquirir o dispositivo, ative sua conta para liberar o conversor do site.',
        Icone: FaUserCheck,
    },
    {
        titulo: 'Envie o arquivo',
        texto: 'Na página de conversão, escolha um arquivo TXT ou EPUB. A conversão para braille começa em seguida.',
        Icone: FaFileArrowUp,
    },
    {
        titulo: 'Transfira pelo cabo USB',
        texto: 'Conecte o dispositivo ao computador com um cabo USB e envie o livro convertido. Quando terminar, o site emite um som avisando que a transferência foi concluída.',
        Icone: FaUsb,
    },
    {
        titulo: 'Leia com o dedo',
        texto: 'Apoie o dedo indicador no topo do dispositivo. Os pinos sobem pelos orifícios e formam um caractere por vez, no ritmo automático ou no seu ritmo, com os botões.',
        Icone: FaHandPointUp,
    },
]

export default function ProductSteps() {
    return (
        <section id="como-usar" className="steps" aria-labelledby="steps-titulo">
            <Reveal as="h2" id="steps-titulo" className="steps-title">
                Como <span>usar</span>
            </Reveal>
            <Reveal as="p" delay={100} className="steps-lead">
                Em poucos passos, seu livro ganha forma.
            </Reveal>

            {/* role="list" mantém a semântica de lista no Safari/VoiceOver, que a perde com list-style: none */}
            <ol className="steps-list" role="list">
                {PASSOS.map(({ titulo, texto, Icone }, i) => (
                    // O <li> faz a animação de entrada (Reveal).
                    // O cartão (.step) fica DENTRO dele e cuida só do hover.
                    // Separados, as duas animações não brigam.
                    <Reveal as="li" key={titulo} delay={i * 100} className="step-item">
                        <div className="step">
                            <span className="step-number" aria-hidden="true">{i + 1}</span>
                            <span className="step-icon" aria-hidden="true">
                                <Icone />
                            </span>
                            <h3 className="step-title">{titulo}</h3>
                            <p className="step-text">{texto}</p>
                        </div>
                    </Reveal>
                ))}
            </ol>
        </section>
    )
}