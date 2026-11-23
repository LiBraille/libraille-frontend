import { useEffect, useRef, useState } from 'react'
import './reveal.css'

// REVEAL: faz um elemento aparecer com animação quando ele entra na tela (durante o scroll).
//
// Exemplo:  <Reveal as="h2" variant="up" delay={100} className="titulo">Texto</Reveal>
//
// Props:
//   as       → qual tag HTML desenhar (div, h2, p, li, figure...). Padrão: div
//   variant  → como aparece: 'up' (sobe), 'left', 'right', 'scale' (cresce) ou 'fade'
//   delay    → atraso em milissegundos (para itens de uma lista entrarem em sequência)
//
// Como funciona: o IntersectionObserver (recurso do navegador) avisa quando o elemento
// aparece na tela. Aí adicionamos a classe "is-visible" e o CSS (reveal.css) faz a transição.
//
// Cuidado: não use direto em elementos que já tenham "transition" própria no CSS
// (botões com hover, por exemplo). Coloque o elemento DENTRO de um <Reveal>.

export default function Reveal({
    as: Tag = 'div',
    variant = 'up',
    delay = 0,
    className = '',
    style,
    children,
    ...rest
}) {
    const ref = useRef(null)
    const [visivel, setVisivel] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Navegador sem IntersectionObserver: mostra tudo de uma vez
        if (!('IntersectionObserver' in window)) {
            setVisivel(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisivel(true)
                    observer.disconnect()   // anima só na primeira vez
                }
            },
            { threshold: 0}
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            className={`reveal reveal--${variant} ${visivel ? 'is-visible' : ''} ${className}`}
            style={{ '--reveal-delay': `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    )
}