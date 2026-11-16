import Reveal from '../Reveal/Reveal'
import './aboutPurpose.css'

// Livro aberto
function OpenBook() {
    return (
        <svg viewBox="0 0 240 200" className="purpose-svg" aria-hidden="true" focusable="false">
            {/* capa */}
            <path className="art-purple" d="M20 62v100c38-10 74-10 100 6 26-16 62-16 100-6V62z" />
            {/* páginas */}
            <path className="art-page" d="M120 62C95 46 60 46 30 56v94c30-9 65-9 90 6z" />
            <path className="art-page" d="M120 62c25-16 60-16 90-6v94c-30-9-65-9-90 6z" />
            <path className="art-line" d="M120 62v94" />
            {/* linhas de texto */}
            <g className="art-line">
                <path d="M46 78c18-4 38-3 58 4M46 96c18-4 38-3 58 4M46 114c18-4 38-3 58 4" />
                <path d="M136 82c20-7 40-8 58-4M136 100c20-7 40-8 58-4M136 118c20-7 40-8 58-4" />
            </g>
            {/* marcador */}
            <path className="art-gold" d="M168 54v52l9-8 9 8V51z" />
            {/* brilhos */}
            <g className="art-gold art-sparkle">
                <path d="M120 22l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                <path d="M188 28l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
                <path d="M52 30l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
            </g>
        </svg>
    )
}

// Pilha de livros com estrela
function BookStack() {
    return (
        <svg viewBox="0 0 240 200" className="purpose-svg" aria-hidden="true" focusable="false">
            {/* livro de baixo */}
            <rect className="art-purple" x="36" y="144" width="168" height="34" rx="6" />
            <rect className="art-gold" x="56" y="144" width="8" height="34" />
            <rect className="art-gold" x="72" y="144" width="4" height="34" />
            {/* livro do meio */}
            <rect className="art-gold" x="58" y="108" width="136" height="32" rx="6" />
            <rect className="art-purple" x="150" y="108" width="8" height="32" />
            <rect className="art-purple" x="164" y="108" width="4" height="32" />
            {/* livro de cima */}
            <rect className="art-page" x="48" y="74" width="144" height="30" rx="6" />
            <rect className="art-purple" x="68" y="74" width="8" height="30" />
            <rect className="art-gold" x="84" y="74" width="4" height="30" />
            {/* estrela */}
            <g className="art-gold art-sparkle">
                <path d="M120 14l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" />
            </g>
            <g className="art-line">
                <path d="M120 2v6M160 28l-4 4M80 28l4 4" />
            </g>
        </svg>
    )
}

const ITENS = [
    {
        id: 'missao',
        titulo: 'Missão',
        texto: 'Possibilitar que pessoas com deficiência visual tenham maior acesso aos livros através da tecnologia.',
        Arte: OpenBook,
    },
    {
        id: 'visao',
        titulo: 'Visão',
        texto: 'Democratizar o acesso ao conhecimento para pessoas com deficiência visual por meio de tecnologias inovadoras e acessíveis.',
        Arte: BookStack,
    },
]

function AboutPurpose() {
    return (
        <section className="purpose" aria-label="Missão e visão">
            {ITENS.map(({ id, titulo, texto, Arte }, i) => (
                <article
                    key={id}
                    className={`purpose-item ${i % 2 === 1 ? 'is-reverse' : ''}`}
                    aria-labelledby={`purpose-${id}`}
                >
                    <div className="purpose-text">
                        <Reveal as="h2" id={`purpose-${id}`} className="purpose-title">
                            {titulo}
                        </Reveal>
                        <Reveal as="p" delay={100} className="purpose-statement">
                            {texto}
                        </Reveal>
                    </div>

                    <Reveal variant="scale" delay={150}>
                        <div className="purpose-art">
                            <Arte />
                        </div>
                    </Reveal>
                </article>
            ))}
        </section>
    )
}

export default AboutPurpose