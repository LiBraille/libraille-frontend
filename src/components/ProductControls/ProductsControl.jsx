import { Link } from 'react-router-dom'
import { FaForward, FaBackward, FaPause } from 'react-icons/fa6'
import Reveal from '../Reveal/Reveal'
import { BOTOES } from '../../data/deviceControls'
import './productControls.css'

const ICONES = { avancar: FaForward, retroceder: FaBackward, pausar: FaPause }

export default function ProductControls() {
  return (
    <section id="controles" className="controls" aria-labelledby="controles-titulo">
      <Reveal as="h2" id="controles-titulo" className="controls-title">
        Conheça os <span>controles</span>
      </Reveal>
      <Reveal as="p" delay={100} className="controls-lead">
        O dispositivo tem uma célula de leitura que mostra um caractere por vez. Ela pode avançar
        sozinha, no ritmo escolhido, ou no seu ritmo, com três botões.
      </Reveal>

      <ul className="controls-list" role="list">
        {BOTOES.map(({ id, nome, tato, resumo, gestos }, i) => {
          const Icone = ICONES[id]
          return (
            // O li faz a animação de entrada; a div é o cartão (mesmo padrão dos passos)
            <Reveal as="li" key={id} delay={i * 100} className="control-item">
              <div className="control">
                <span className="control-icon" aria-hidden="true"><Icone /></span>
                <h3 className="control-name">{nome}</h3>
                <p className="control-text">{resumo}</p>
                <p className="control-tato">{tato}</p>
                {gestos.length > 0 && (
                  <ul className="control-gestures">
                    {gestos.map(({ quando, efeito }) => (
                      <li key={quando}><strong>{quando}:</strong> {efeito}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          )
        })}
      </ul>

      <Reveal delay={200} className="controls-more">
        <p>Quer o passo a passo completo? O manual de uso fica disponível depois do login.</p>
        <Link to="/manual" className="btn btn--ghost">Abrir o manual</Link>
      </Reveal>
    </section>
  )
}