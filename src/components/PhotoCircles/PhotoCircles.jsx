import './PhotoCircles.css';
import CircleImages from '../../assets/CircleImages.png';



function PhotoCircles() {
    return (
        <>
        <img src={CircleImages} alt="" className="photo-circles"/>
        {/* <div className="photo-circles">
            <span className="decorative-circle circle-1"></span>
            <span className="decorative-circle circle-2"></span>
            <span className="decorative-circle circle-3"></span>

            <div className="photos-container">
                <img src={foto1} alt="Foto 1" className="photo photo-1"/>
                <img src={foto2} alt="Foto 2" className="photo photo-2"/>
                <img src={foto3} alt="Foto 3" className="photo photo-3"/>
                <img src={foto4} alt="Foto 4" className="photo photo-4"/>
            </div>
        </div> */}
        </>
    );
}

export default PhotoCircles