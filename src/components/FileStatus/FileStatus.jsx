import { FaCheck } from 'react-icons/fa6'
import './fileStatus.css'

const ETAPAS = ['Upload do arquivo', 'Conversão para braille', 'Pronto para transferir']

function FileStatus({ etapa = 0, progresso = 0, arquivo = '', aviso = '' }) {
  const emAndamento = etapa === 1 || etapa === 2

  return (
    <section className="status" aria-labelledby="status-titulo">
      <h2 id="status-titulo" className="status__title">Progresso</h2>
      {arquivo && <p className="status__file">{arquivo}</p>}

      <ol className="status__steps" role="list">
        {ETAPAS.map((rotulo, i) => {
          const n = i + 1
          const feito = etapa === 3 || etapa > n
          const atual = etapa === n && etapa < 3

          return (
            <li
              key={rotulo}
              className={`status__step ${feito ? 'is-done' : ''} ${atual ? 'is-current' : ''}`}
              aria-current={atual ? 'step' : undefined}
            >
              <span className="status__circle" aria-hidden="true">
                {feito ? <FaCheck /> : n}
              </span>
              <h3 className="status__label">
                {rotulo}
                <span className="sr-only">
                  {feito ? ' (concluído)' : atual ? ' (em andamento)' : ' (aguardando)'}
                </span>
              </h3>
            </li>
          )
        })}
      </ol>

      {emAndamento && (
        <progress
          className="status__bar"
          max="100"
          value={etapa === 1 ? Math.round(progresso * 100) : undefined}   // sem valor = indeterminado
          aria-label={etapa === 1 ? 'Progresso do envio' : 'Convertendo'}
        />
      )}

      {/* Única região "ao vivo": o leitor de tela anuncia cada mudança */}
      <p className="status__message" role="status">
        {aviso || 'Nenhum arquivo em conversão.'}
      </p>
    </section>
  )
}

export default FileStatus