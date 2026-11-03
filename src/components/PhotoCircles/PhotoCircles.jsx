import './PhotoCircles.css';
import foto1 from '../../assets/Ellipse 89.png';
import foto2 from '../../assets/Ellipse 87.png';
import foto3 from '../../assets/Ellipse 91.png';
import foto4 from '../../assets/Ellipse 86.png';



function PhotoCircles() {
    return (
        <div className="photo-circles">
            <span className="decorative-circle circle-1"></span>
            <span className="decorative-circle circle-2"></span>
            <span className="decorative-circle circle-3"></span>

            <div className="photos-container">
                <img src={foto1} alt="Foto 1" className="photo photo-1"/>
                <img src={foto2} alt="Foto 2" className="photo photo-2"/>
                <img src={foto3} alt="Foto 3" className="photo photo-3"/>
                <img src={foto4} alt="Foto 4" className="photo photo-4"/>
            </div>
        </div>
    );
}

export default PhotoCircles;