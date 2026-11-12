import './about-story.css'
import fotoGrupo from '../../assets/grupo-foto.jpeg'

function AboutStory() {
    return (
        <section className='about-us'>
            <div className='about-us-text'>
            <h1>Nossa <span>história</span></h1>
            <p>Acreditamos que a leitura é uma das principais formas de adquirir conhecimento, desenvolver a imaginação e conquistar autonomia. </p>
            <p>Foi pensando nisso que surgiu o Libraille: uma iniciativa que une tecnologia, acessibilidade e inovação com um proposito claro de democratizar o acesso à leitura para pessoas com deficiência visual.</p>
            </div>
            <img src={fotoGrupo} className="team-photo" alt="As pessoas posam juntas de forma amigável e descontraída, transmitindo um ambiente de união, equipa ou participação num programa/projeto." />

        </section>
    )

}

export default AboutStory