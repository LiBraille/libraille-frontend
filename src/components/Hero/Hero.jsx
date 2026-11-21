import { Link } from 'react-router-dom'
import ScrambledText from '../ScrambleText/ScrambledText'
import './hero.css'

const titulo = 'Histórias que ganham relevo'
const subtitulo = 'Transforme livros em experiências de leitura tátil com o LiBraille'

// Ajustes do efeito de letras embaralhadas (estes são os valores padrão do componente)
const scrambleProps = {
  effect: 'scramble',
  radius: 100,         // distância do mouse que afeta as letras
  strength: 1,
  trail: 0.6,
  duration: 1.2,
  speed: 0.5,
  scrambleChars: '.:', // caracteres que aparecem durante o embaralhado
  clickBurst: true,    // clique cria uma "onda"
  intro: true,         // anima quando o texto aparece
}

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-titulo">

      <div className="hero-content">
        <div className="hero-texts">
          {/* Texto real para leitores de tela e para o Google */}
          <h1 id="hero-titulo" className="sr-only">{titulo}</h1>
          <p className="sr-only">{subtitulo}</p>

          {/* Versão visual animada: escondida dos leitores de tela para não repetir */}
          <div aria-hidden="true">
            <ScrambledText className="hero-title" {...scrambleProps}>
              {titulo}
            </ScrambledText>
            <ScrambledText className="hero-paragraph" {...scrambleProps}>
              {subtitulo}
            </ScrambledText>
          </div>
        </div>

        {/* btn e btn--primary vêm do index.css; hero-button só ajusta o tamanho */}
        <Link to="/sobre" className="btn btn--primary hero-button">
          Saiba mais
          <span className="sr-only"> sobre o projeto LiBraille</span>
        </Link>
      </div>
    </section>
  )
}