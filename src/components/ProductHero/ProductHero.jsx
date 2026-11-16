import { useState } from 'react'
import { FaCartShopping, FaCirclePlay } from 'react-icons/fa6'
import Reveal from '../Reveal/Reveal'
import BrailleBackground from '../BrailleBackground/BrailleBackground'
import VideoModal from '../VideoModal/VideoModal'
import Product from '../../assets/ImageproductDarkMode.png'
import './productHero.css'

export default function ProductHero() {
    // const [videoAberto, setVideoAberto] = useState(false)
    // const temVideo = Boolean(VIDEOS.demonstracao)

    return (
        <section className="product-hero" aria-labelledby="product-hero-titulo">
            {/* <BrailleBackground /> */}

            <div className="product-hero__inner">
                <div className="product-hero__text">
                    <Reveal as="h1" id="product-hero-titulo" className="product-hero__title">
                        Conheça o <span>dispositivo</span>
                    </Reveal>

                    <Reveal as="p" delay={100} className="product-hero__lead">
                        O LiBraille é um dispositivo de leitura tátil para pessoas com deficiência
                        visual. Você envia um livro ou documento em TXT ou EPUB pelo nosso site, e o
                        dispositivo forma cada letra em braille, com pinos que sobem sob o seu dedo.
                    </Reveal>

                    <Reveal delay={200} className="product-hero__actions">
                        <a href="#comprar" className="btn btn--primary">
                            <FaCartShopping aria-hidden="true" />
                            Quero adquirir
                        </a>
                        <a href="#como-usar" className="btn btn--ghost">
                            Como usar
                        </a>
                    </Reveal>
                </div>

                <Reveal as="figure" variant="scale" delay={150} className="product-hero__media">
                    <div className="product-hero__halo" aria-hidden="true" />
                    <div className="product-hero__frame">
                        <img
                            className="product-hero__img"
                            src={Product}
                            alt="Dispositivo cúbico de cantos arredondados, com uma cela de seis orifícios no topo, organizados em duas colunas de três, e uma porta USB-C na parte inferior frontal."
                            width="600"
                            height="600"
                            decoding="async"
                        />

                        {/* {temVideo && (
                            <button
                                type="button"
                                className="btn btn--primary product-hero__play"
                                onClick={() => setVideoAberto(true)}
                            >
                                <FaCirclePlay aria-hidden="true" />
                                Assistir demonstração
                            </button>
                        )} */}
                    </div>
                </Reveal>
            </div>

            {/* {temVideo && (
                <VideoModal
                    aberto={videoAberto}
                    aoFechar={() => setVideoAberto(false)}
                    titulo="Demonstração do dispositivo LiBraille"
                    videoId={VIDEOS.demonstracao}
                />
            )} */}
        </section>
    )
}