import { useState } from 'react'
import { FaUserCheck, FaFileArrowUp, FaWifi, FaHandPointUp, FaCirclePlay } from 'react-icons/fa6'
import Reveal from '../Reveal/Reveal'
// import VideoModal from '../VideoModal/VideoModal'
// import { VIDEOS } from '../../data/productVideos'
import './productSteps.css'

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
        titulo: 'Transfira para o dispositivo',
        texto: 'O arquivo é enviado por Wi-Fi ou cabo USB-C. Quando terminar, o site emite um som avisando que a transferência foi concluída.',
        Icone: FaWifi,
    },
    {
        titulo: 'Leia com o dedo',
        texto: 'Apoie o dedo indicador no topo do dispositivo. Os pinos sobem pelos orifícios e formam cada letra em braille.',
        Icone: FaHandPointUp,
    },
]

export default function ProductSteps() {
    // const [videoAberto, setVideoAberto] = useState(false)
    // const temVideo = Boolean(VIDEOS.passoAPasso)

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
                    <Reveal as="li" key={titulo} delay={i * 100} className="step">
                        <span className="step-number" aria-hidden="true">{i + 1}</span>
                        <span className="step-icon" aria-hidden="true">
                            <Icone />
                        </span>
                        <h3 className="step-title">{titulo}</h3>
                        <p className="step-text">{texto}</p>
                    </Reveal>
                ))}
            </ol>

            {/* {temVideo && (
                <Reveal delay={200}>
                    <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => setVideoAberto(true)}
                    >
                        <FaCirclePlay aria-hidden="true" />
                        Ver como funciona
                    </button>

                    <VideoModal
                        aberto={videoAberto}
                        aoFechar={() => setVideoAberto(false)}
                        titulo="Passo a passo: como usar o LiBraille"
                        videoId={VIDEOS.passoAPasso}
                    />
                </Reveal>
            )} */}
        </section>
    )
}