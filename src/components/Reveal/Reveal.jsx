//O Reveal é um componente que permite animar a entrada de elementos na tela quando eles entram na viewport. Ele utiliza a API IntersectionObserver para detectar quando o elemento está visível e aplica classes CSS para realizar a animação. O componente aceita várias props, incluindo o tipo de elemento HTML a ser renderizado, o tipo de animação, o atraso da animação, classes adicionais e estilos inline.

import { useEffect, useRef, useState } from 'react'
import './reveal.css'

export default function Reveal({
    as: Tag = 'div',
    variant = 'up',      // 'up' | 'left' | 'right' | 'scale' | 'fade'
    delay = 0,           // ms, para escalonar itens
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

        if (!('IntersectionObserver' in window)) {
            setVisivel(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisivel(true)
                    observer.disconnect() // anima só na primeira vez
                }
            },
            { threshold: 0, rootMargin: '0px 0px -10% 0px' }
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