import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Reveal from '../Reveal/Reveal'
import './aboutValues.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const VALORES = [
    { titulo: 'Inovação', descricao: 'Explorar a tecnologia para ampliar possibilidades.' },
    { titulo: 'Empatia', descricao: 'Considerar as necessidades reais das pessoas.' },
    { titulo: 'Autonomia', descricao: 'Valorizar a independência na experiência de leitura.' },
    { titulo: 'Acessibilidade', descricao: 'Pensar na acessibilidade desde o início.' },
]

// Este é o ÚNICO componente que usa GSAP/ScrollTrigger direto.
// Os outros usam <Reveal>. Aqui precisamos de algo que o Reveal não faz:
// a linha dourada vai enchendo conforme a pessoa rola a página (efeito "scrub").
export default function AboutValues() {
    const timelineRef = useRef(null)
    const [ativos, setAtivos] = useState(0)

    useGSAP(
        () => {
            const el = timelineRef.current
            const ultimo = VALORES.length - 1

            const atualizar = (progresso) => {
                // Barra: direto no DOM, sem re-renderizar o React
                el.style.setProperty('--progress', `${progresso * 100}%`)

                // Pontos: o React só atualiza quando o número muda
                const qtd = VALORES.filter(
                    (_, i) => progresso > 0 && progresso >= i / ultimo
                ).length
                setAtivos(qtd)
            }

            ScrollTrigger.create({
                trigger: el,
                start: 'top 60%',
                end: 'bottom 60%',
                onUpdate: (self) => atualizar(self.progress),
                onRefresh: (self) => atualizar(self.progress),
            })
        },
        { scope: timelineRef }
    )

    return (
        <section className="values" aria-labelledby="values-titulo">
            <div className="values-intro">
                <Reveal as="h2" id="values-titulo" className="values-title">
                    Nossos <span>valores</span>
                </Reveal>
                <Reveal as="p" delay={100} className="values-lead">
                    Mais do que tecnologia, acreditamos em criar possibilidades, promover
                    independência e tornar a leitura acessível a todos.
                </Reveal>
            </div>

            <div className="values-timeline" ref={timelineRef}>
                <div className="values-track" aria-hidden="true">
                    <div className="values-fill" />
                </div>

                <ol className="values-list" role="list">
                    {VALORES.map(({ titulo, descricao }, i) => (
                        <Reveal
                            as="li"
                            key={titulo}
                            variant={i % 2 === 0 ? 'left' : 'right'}
                            className={`values-item ${i % 2 === 0 ? 'is-left' : 'is-right'}`}
                        >
                            <span
                                className={`values-dot ${i < ativos ? 'is-active' : ''}`}
                                aria-hidden="true"
                            />
                            <div className="values-card">
                                <span className="values-number" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3>{titulo}</h3>
                                <p>{descricao}</p>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    )
}