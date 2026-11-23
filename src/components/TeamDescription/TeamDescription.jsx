import { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa'
import Reveal from '../Reveal/Reveal'
import teamMembers from '../../data/teamMembers'
import { renderizarIconeStack } from '../../utils/stacksIcons'
import './teamdescription.css'

const REDES = [
    { chave: 'linkedin', nome: 'LinkedIn', Icone: FaLinkedin },
    { chave: 'github', nome: 'GitHub', Icone: FaGithub },
]

function TeamDescription() {
    // indiceAtual = posição do membro mostrado (0 é o primeiro da lista)
    const [indiceAtual, setIndiceAtual] = useState(0)
    const total = teamMembers.length
    const membro = teamMembers[indiceAtual]

    // O "%" faz a lista dar a volta: depois do último vem o primeiro
    const proximo = () => setIndiceAtual((i) => (i + 1) % total)
    const anterior = () => setIndiceAtual((i) => (i - 1 + total) % total)

    // Só mostra as redes que têm link preenchido
    const redes = REDES.filter(({ chave }) => membro.redesSociais?.[chave])

    return (
        <section className="team" aria-labelledby="team-titulo">
            <Reveal as="h2" id="team-titulo" className="team-title">
                Conheça nossa <span>equipe</span>
            </Reveal>

            {/* Frase curta que o leitor de tela anuncia quando o membro muda
                (fica escondida da tela por causa da classe sr-only) */}
            <p className="sr-only" role="status">
                Mostrando {membro.nome}, {indiceAtual + 1} de {total}.
            </p>

            <Reveal variant="scale" delay={100} className="team-stage">
                {/* key={membro.id}: ao trocar de membro, o React recria o cartão
                    e a animação de entrada roda de novo */}
                <article key={membro.id} className="member-card">
                    <img
                        className="member-photo"
                        src={membro.foto}
                        alt={`Foto de ${membro.nome}`}
                        width="400"
                        height="500"
                        decoding="async"
                    />

                    <div className="member-body">
                        <header className="member-header">
                            <div className="member-name-row">
                                <h3 className="member-name">{membro.nome}</h3>

                                {redes.length > 0 && (
                                    <ul className="member-social" aria-label={`Redes de ${membro.nome}`}>
                                        {redes.map(({ chave, nome, Icone }) => (
                                            <li key={chave}>
                                                <a
                                                    href={membro.redesSociais[chave]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="member-social-link"
                                                    aria-label={`${nome} de ${membro.nome} (abre em nova aba)`}
                                                >
                                                    <Icone aria-hidden="true" />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <p className="member-role">{membro.cargo}</p>
                        </header>

                        <p className="member-description">{membro.descricao}</p>

                        {membro.stack.length > 0 && (
                            <ul className="member-stack" aria-label="Tecnologias">
                                {membro.stack.map((tecnologia) => {
                                    const icone = renderizarIconeStack(tecnologia)
                                    return (
                                        <li key={tecnologia} className="stack-item">
                                            {icone && (
                                                <span className="stack-icon" aria-hidden="true">
                                                    {icone}
                                                </span>
                                            )}
                                            {tecnologia}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                        <div className="member-nav">
                            <button
                                type="button"
                                className="member-nav-btn"
                                onClick={anterior}
                                aria-label="Membro anterior"
                            >
                                <FaArrowLeft aria-hidden="true" />
                            </button>
                            <span className="member-counter">
                                {indiceAtual + 1} de {total}
                            </span>
                            <button
                                type="button"
                                className="member-nav-btn"
                                onClick={proximo}
                                aria-label="Próximo membro"
                            >
                                <FaArrowRight aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </article>
            </Reveal>

            {/* Miniaturas: clicar em uma mostra aquele membro */}
            <Reveal delay={200}>
                <ul className="team-thumbs" aria-label="Escolher membro da equipe">
                    {teamMembers.map((m, index) => (
                        <li key={m.id}>
                            <button
                                type="button"
                                className="thumb-btn"
                                onClick={() => setIndiceAtual(index)}
                                aria-label={`Ver ${m.nome}`}
                                aria-current={index === indiceAtual ? 'true' : undefined}
                            >
                                <img src={m.foto} alt="" loading="lazy" decoding="async" />
                            </button>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </section>
    )
}

export default TeamDescription