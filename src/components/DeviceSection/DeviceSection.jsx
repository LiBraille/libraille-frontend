import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Product from '../../assets/ImageProductDarkMode.png'
import './deviceSection.css'
import { FaArrowRightLong } from "react-icons/fa6";
import BrailleCell from '../BrailleCell/BrailleCell'

gsap.registerPlugin(ScrollTrigger, useGSAP)


function DeviceSection() {
    const sectionRef = useRef(null)

    useGSAP(
        () => {
            const mm = gsap.matchMedia()

            // Só anima se o usuário NÃO pediu para reduzir movimento
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                })

                tl.from('.device__media', { x: -60, opacity: 0, duration: 0.9, ease: 'power3.out' })
                    .from(
                        '.device__reveal',
                        { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
                        '-=0.5'
                    )
                    .from(
    '.braille-dot__pin',
    { scale: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(3)', clearProps: 'transform' },
    '-=0.4'
)

                // Parallax sutil no produto enquanto a seção passa pela tela
                gsap.to('.device__product', {
                    yPercent: -6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                })
            })
        },
        { scope: sectionRef }
    )

    return (
        <section ref={sectionRef} className="device" aria-labelledby="device-titulo">
                <div className="device__content">
                    <h2 id="device-titulo" className="device__title device__reveal">
                            Dispositivo LiBraille
                        </h2>
                        <p className="device__description device__reveal">
                        Desenvolvido para conectar leitores com deficiência visual a conteúdos digitais por meio de pinos eletromecânicos de alta resposta.
                    </p>
                    <Link to="/produto" className="device__button device__reveal">
                        Conheça o produto
                        <FaArrowRightLong />
                    </Link>
                </div>
            <div className="device__inner">
                <figure className="device__media">
                    <div className="device__halo" aria-hidden="true"></div>
                    <div className="device__frame">
                        <img
                            className="device__product"
                            src={Product}
                            alt="Dispositivo cúbico de cantos arredondados, com uma cela de seis orifícios no topo, organizados em duas colunas de três, e uma porta USB-C na parte inferior frontal."
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </figure>
                <BrailleCell className="device__reveal" />

                
            </div>
        </section>
    )
}

export default DeviceSection