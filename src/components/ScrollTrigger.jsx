import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ORIGENS = {
    up: { y: 32 },
    left: { x: -40 },
    right: { x: 40 },
    scale: { scale: 0.92 },
    fade: {},
}

export default function Reveal({
    as: Tag = 'div',
    variant = 'up',
    delay = 0,          // em ms
    className = '',
    children,
    ...rest
}) {
    const ref = useRef(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        // Só anima quem não pediu para reduzir movimento
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from(ref.current, {
                ...ORIGENS[variant],
                opacity: 0,
                duration: 0.7,
                delay: delay / 1000,
                ease: 'power3.out',
                clearProps: 'all',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 90%',
                    once: true,
                },
            })
        })
    }, { scope: ref })

    return (
        <Tag ref={ref} className={className} {...rest}>
            {children}
        </Tag>
    )
}