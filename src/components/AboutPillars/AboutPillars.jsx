import './AboutPillars.css'
import Eye from '../../assets/eye.png'
import compass from '../../assets/compass.png'
import Love from '../../assets/Love1.png'

function AboutPillars() {
    return(
        <section className="pillars-container">
            <div className="pillar-card">
                <img src={compass} alt="Ícone branco de uma bússola num fundo preto, que representa direção, missão ou navegação." />
                <h3>Missão</h3>
                <p>Possibilitar que pessoas com deficiência visual tenham maior acesso aos livros através da tecnologia.</p>
            </div>

            <div className="pillar-card">
                <img src={Eye} alt="Ícone branco de um olho num fundo preto, que representa visão ou visibilidade." />
                <h3>Visão</h3>
                <p>Democratizar o acesso ao conhecimento para pessoas com deficiência visual por meio de tecnologias inovadoras e acessíveis.</p>
            </div>

            <div className="pillar-card">
                <img src={Love} alt="Ícone branco do contorno de um coração num fundo preto, que representa favoritos ou afeição." />
                <h3>Valores</h3>
                <ul>
                    <li>Empatia</li>
                    <li>Diversidade</li>
                    <li>Acessibilidade</li>
                    <li>Respeito</li>
                    <li>Inovação</li>
                    <li>Democratização da informação</li>
                </ul>
            </div>
        </section>
    )
}
export default AboutPillars