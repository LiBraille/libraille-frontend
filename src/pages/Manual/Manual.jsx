import { Link } from 'react-router-dom'
import { FaForward, FaBackward, FaPause } from 'react-icons/fa6'
import { usePageTitle } from '../../hooks/usePageTitle'
import { BOTOES } from '../../data/deviceControls'
import './manual.css'

const ICONES = { avancar: FaForward, retroceder: FaBackward, pausar: FaPause }

// Marcador amarelo para o que o grupo ainda precisa confirmar.
// Antes da apresentação, resolva todos e apague este componente.
const Pendente = ({ children }) => (
  <span className="manual-todo">[CONFIRMAR: {children}]</span>
)

export default function Manual() {
  usePageTitle('Manual de uso')

  return (
    <div className="page-glow">
      <article className="manual" aria-labelledby="manual-titulo">
        <header className="manual-header">
          <h1 id="manual-titulo">Manual de <span>uso</span></h1>
          <p className="manual-lead">
            Aprenda a converter um livro no site e a ler com o dispositivo LiBraille.
          </p>

          {/* Índice: ajuda quem usa leitor de tela a pular direto para a parte que quer */}
          <nav aria-label="Neste manual">
            <ul className="manual-index" role="list">
              <li><a href="#converter">Converter e enviar o livro</a></li>
              <li><a href="#dispositivo">Conhecendo o dispositivo</a></li>
              <li><a href="#botoes">Os três botões</a></li>
              <li><a href="#modos">Modos de leitura</a></li>
              <li><a href="#apagar">Apagar o livro do dispositivo</a></li>
            </ul>
          </nav>
        </header>

        <section id="converter" aria-labelledby="converter-titulo">
          <h2 id="converter-titulo">1. Converter e enviar o livro</h2>
          <ol className="manual-steps" role="list">
            <li>
              <strong>Use o Chrome ou o Edge, no computador.</strong> A transferência por cabo
              não funciona em outros navegadores.
            </li>
            <li>
              <strong>Abra o Conversor</strong> no menu do site (ele aparece depois do login).
            </li>
            <li>
              <strong>Escolha o livro.</strong> Clique em Escolher arquivo (ou arraste o arquivo
              para a caixa). Os formatos aceitos são <strong>TXT</strong> e <strong>EPUB</strong>.
            </li>
            <li>
              <strong>Aguarde a conversão.</strong> O site mostra o progresso. Quando terminar,
              toca um som e aparece o aviso em texto: Pronto para transferir.
            </li>
            <li>
              <strong>Conecte o dispositivo ao computador com um cabo USB-C que transmita dados.</strong>{' '}
              Atenção: alguns cabos de carregador só dão energia e não servem para enviar o livro.
            </li>
            <li>
              <strong>Clique em Transferir</strong> no livro pronto. O site avisa com som e com
              texto quando a transferência terminar.{' '}
              <Pendente>se o livro novo substitui o que já estava no aparelho</Pendente>
            </li>
          </ol>
          <p className="manual-note">
            Atenção: a lista de livros do Conversor vale só para a sessão. Se você recarregar ou
            sair da página, a lista é apagada. Isso não apaga o livro que já foi transferido
            para o dispositivo.
          </p>
        </section>

        <section id="dispositivo" aria-labelledby="dispositivo-titulo">
          <h2 id="dispositivo-titulo">2. Conhecendo o dispositivo</h2>
          <p>
            O LiBraille tem <strong>uma célula de leitura</strong> no topo, com seis pinos em
            duas colunas de três. Ela mostra <strong>um caractere por vez</strong>: os pinos
            sobem e descem para formar cada letra em braille.
          </p>
          <p>
            Para ler, apoie a ponta do <strong>dedo indicador</strong> sobre a célula e deixe o
            dedo parado. Quem muda de caractere é o aparelho, não a sua mão.
          </p>
          <p>
            Na parte baixa da frente, em linha, ficam <strong>três botões</strong>. O aparelho
            guarda <strong>um livro por vez</strong> e, ao ser ligado, começa{' '}
            <strong>pausado</strong>.
          </p>
          <p>
            O cabo USB-C também alimenta o aparelho. Nesta versão, para ler sem o computador,
            ligue-o a uma fonte de carregador com o cabo. A ideia é que a versão final funcione
            com bateria interna.
          </p>
        </section>

        <section id="botoes" aria-labelledby="botoes-titulo">
          <h2 id="botoes-titulo">3. Os três botões</h2>
          <p>
            Estão listados da esquerda para a direita. Você os reconhece pelo tato: os dois das
            pontas têm uma seta em relevo, e o do meio é totalmente liso.
          </p>

          <ul className="manual-buttons" role="list">
            {BOTOES.map(({ id, nome, tato, resumo, gestos }) => {
              const Icone = ICONES[id]
              return (
                <li key={id} className="manual-button">
                  <span className="manual-button__icon" aria-hidden="true"><Icone /></span>
                  <div>
                    <h3>{nome}</h3>
                    <p><em>{tato}</em></p>
                    <p>{resumo}</p>
                    {gestos.length > 0 && (
                      <ul className="manual-gestures">
                        {gestos.map(({ quando, efeito }) => (
                          <li key={quando}>
                            <strong>{quando}:</strong> {efeito}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section id="modos" aria-labelledby="modos-titulo">
          <h2 id="modos-titulo">4. Modos de leitura</h2>

          <h3>Pausado (leitura manual)</h3>
          <p>
            É como o aparelho começa. A célula fica parada, e você decide quando passar de um
            caractere para outro: use <strong>Avançar</strong> para o próximo e{' '}
            <strong>Retroceder</strong> para o anterior, no seu tempo.
          </p>

          <h3>Automático</h3>
          <p>
            Dê <strong>um clique</strong> no botão do meio (o liso). A célula passa a trocar de
            caractere sozinha. Para parar, clique de novo no botão do meio: o aparelho volta ao
            modo pausado.
          </p>
          <p>
            Para ler mais depressa, dê <strong>três cliques rápidos</strong> no botão do meio, que
            aumentam a velocidade.{' '}
            <Pendente>quantos níveis de velocidade existem e o que acontece depois do último</Pendente>
          </p>
        </section>

        <section id="apagar" aria-labelledby="apagar-titulo">
          <h2 id="apagar-titulo">5. Apagar o livro do dispositivo</h2>
          <p>
            Para apagar o livro, <strong>mantenha o botão do meio (o liso) pressionado por 10
            segundos</strong>. Se você soltar antes, nada acontece.
          </p>
          <p>
            Como o aparelho guarda um livro por vez, isso apaga o livro que estava gravado. Ao
            terminar, os pinos sobem e descem, depois de alguns segundos.{' '}
            <Pendente>confirmar que o aparelho faz esse movimento dos pinos ao apagar</Pendente>
          </p>
          <p className="manual-note">
            Cuidado: depois de apagar, para ler o livro de novo será preciso converter e
            transferir outra vez. O site não apaga livros do dispositivo: só o botão físico faz
            isso.
          </p>
        </section>

        <footer className="manual-footer">
          <p>Pronto para ler um livro novo?</p>
          <div className="manual-footer__actions">
            <Link to="/conversor" className="btn btn--primary">Ir para o Conversor</Link>
            <Link to="/contato" className="btn btn--ghost">Falar com a equipe</Link>
          </div>
        </footer>
      </article>
    </div>
  )
}