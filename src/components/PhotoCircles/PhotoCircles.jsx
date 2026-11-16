import ScrollTrigger from '../ScrollTrigger'
import CircleImages from '../../assets/CircleImages.png'
import './PhotoCircles.css'

function PhotoCircles() {
    return (
        <ScrollTrigger as="figure" variant="scale" className="photo-circles">
            <img
                src={CircleImages}
                alt="Colagem de círculos com retratos sorridentes de um menino, um senhor e duas jovens, entre círculos coloridos."
                loading="lazy"
                decoding="async"
            />
        </ScrollTrigger>
    )
}

export default PhotoCircles