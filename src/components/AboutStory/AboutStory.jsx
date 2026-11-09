
import './AboutStory.css'
import FotoProa from '../../assets/PROA.jpeg'

function AboutStory() {
    return (
        <section className='About-story'>
            
            <div className='text-content'>
                <h1>Nossa história</h1>
                
                <p>Acreditamos que a leitura é uma das principais formas de adquirir conhecimento, desenvolver a imaginação e conquistar autonomia. <br />
                Foi pensando nisso que surgiu o Libraille: uma iniciativa que une tecnologia, acessibilidade e inovação com um proposito claro de democratizar o acesso à leitura para pessoas com deficiência visual.</p>
                
            </div>

            <img src={FotoProa} className="photo-circles" alt="As pessoas posam juntas de forma amigável e descontraída, transmitindo um ambiente de união, equipa ou participação num programa/projeto." />

        </section>
    )

}

export default AboutStory