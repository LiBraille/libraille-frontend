import { Link } from 'react-router-dom'
import ScrambledText from '../../components/ScrambleText/ScrambledText'
import BrailleBackground from '../BrailleBackground/BrailleBackground'
import './hero.css'

const titulo = 'Histórias que ganham relevo'
const subtitulo = 'Transforme livros em experiências de leitura tátil com o LiBraille'

const scrambleProps = {
  effect: 'scramble',
  radius: 100,
  strength: 1,
  trail: 0.6,
  duration: 1.2,
  speed: 0.5,
  scrambleChars: '.:',
  clickBurst: true,
  intro: true,
}

export default function HeroWithGlueDots() {
  return (
    <section className="hero-section" aria-labelledby="hero-titulo">
      {/* Para testar sem o fundo braille, basta remover esta linha */}
      {/* <BrailleBackground /> */}
      <div className="hero-content">
        <div className="hero-texts">
          {/* Texto real para leitores de tela e SEO */}
          <h1 id="hero-titulo" className="sr-only">{titulo}</h1>
          <p className="sr-only">{subtitulo}</p>

          {/* Versão visual animada: escondida dos leitores de tela */}
          <div aria-hidden="true">
            <ScrambledText className="scrambled-text-demo hero-title" {...scrambleProps}>
              {titulo}
            </ScrambledText>
            <ScrambledText className="scrambled-text-demo hero-paragraph" {...scrambleProps}>
              {subtitulo}
            </ScrambledText>
          </div>
        </div>

        <Link to="/sobre" className="hero-button">
          Saiba mais
          <span className="sr-only"> sobre o produto e a equipe LiBraille</span>
        </Link>
      </div>
    </section>
  );
}