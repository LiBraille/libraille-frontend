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
    const [indiceAtual, setIndiceAtual] = useState(0)
    const total = teamMembers.length
    const membro = teamMembers[indiceAtual]

    const proximo = () => setIndiceAtual((i) => (i + 1) % total)
    const anterior = () => setIndiceAtual((i) => (i - 1 + total) % total)

    // Só mostra as redes que têm link (a Geovanna, por exemplo, não tem nenhuma)
    const redes = REDES.filter(({ chave }) => membro.redesSociais?.[chave])

    return (
        <section className="team" aria-labelledby="team-titulo">
            <Reveal as="h2" id="team-titulo" className="team-title">
                Conheça nossa <span>equipe</span>
            </Reveal>

            <Reveal variant="scale" delay={100} className="team-stage">
                {/* A região "ao vivo" avisa o leitor de tela quando o membro muda */}
                <div aria-live="polite">
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
                                    {membro.stack.map((tecnologia) => (
                                        <li key={tecnologia} className="stack-item">
                                            <span className="stack-icon" aria-hidden="true">
                                                {renderizarIconeStack(tecnologia)}
                                            </span>
                                            {tecnologia}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="member-nav">
                                <button
                                    type="button"
                                    className="nav-btn"
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
                                    className="nav-btn"
                                    onClick={proximo}
                                    aria-label="Próximo membro"
                                >
                                    <FaArrowRight aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </Reveal>

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