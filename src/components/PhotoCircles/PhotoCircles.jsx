import Reveal from '../Reveal/Reveal'
import CircleImages from '../../assets/CircleImages.png'
import './PhotoCircles.css'

function PhotoCircles() {
    return (
        <Reveal as="figure" variant="scale" className="photo-circles">
            <img
                src={CircleImages}
                alt="Colagem de círculos com retratos sorridentes de um menino, um senhor e duas jovens, entre círculos coloridos."
                loading="lazy"
                decoding="async"
            />
        </Reveal>
    )
}

export default PhotoCircles