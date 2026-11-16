import './aboutStory.css'
import fotoGrupo from '../../assets/grupo-foto.jpeg'
import Reveal from '../Reveal/Reveal'

function AboutStory() {
    return (
        <section className='about-us' aria-labelledby="about-titulo">
            <div className='about-us-text'>
            <Reveal as="h1" id="about-titulo" className="about-us-title">Nossa <span>história</span></Reveal>
            <Reveal as="p" delay={100}>Acreditamos que a leitura é uma das principais formas de adquirir conhecimento, desenvolver a imaginação e conquistar autonomia.</Reveal>
             <Reveal as="p" delay={200}>
                    Foi pensando nisso que surgiu o LiBraille: uma iniciativa que une tecnologia,
                    acessibilidade e inovação com um propósito claro de democratizar o acesso à
                    leitura para pessoas com deficiência visual.
                </Reveal>
            </div>
            <Reveal as="figure" variant="right" delay={150} className="about-us-media">
                <img
                    src={fotoGrupo}
                    className="team-photo"
                    alt="Integrantes da equipe LiBraille posando juntos, sorrindo, em um clima descontraído."
                    loading="lazy"
                    decoding="async"
                />
            </Reveal>
        </section>
    )

}

export default AboutStory