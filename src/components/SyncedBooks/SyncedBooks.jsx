import { FaCheck } from 'react-icons/fa6'
import './syncedbooks.css'

const STATUS = {
  ready: 'Pronto',
  processing: 'Convertendo',
  transferring: 'Transferindo',
  transferred: 'Transferido',
}

export default function SyncedBooks({ books = [], onTransfer }) {
  return (
    <section className="synced-books-section" aria-labelledby="synced-titulo">
      <div className="synced-books-card">
        <div className="synced-books-header">
          <h2 id="synced-titulo">Livros convertidos</h2>
          <p>
            Livros convertidos nesta sessão. A lista não fica guardada: ao recarregar ou
            sair da página, ela é apagada.
          </p>
          {/* TODO (grupo): confirmar o texto e o tempo exato de pressionar o botão do dispositivo */}
          <p className="synced-books-note">
            Para apagar um livro do dispositivo, segure o botão físico do aparelho por alguns
            segundos. O site não apaga livros do dispositivo.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="synced-books-empty">
            <h3>Nenhum livro adicionado</h3>
            <p>Os livros que você converter aparecerão aqui.</p>
          </div>
        ) : (
          <div
            className="synced-books-table-container"
            role="region"
            aria-labelledby="synced-titulo"
            tabIndex={0}
          >
            <table className="synced-books-table">
              <thead>
                <tr>
                  <th scope="col">Nome do arquivo</th>
                  <th scope="col">Tamanho</th>
                  <th scope="col">Status</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <th scope="row" className="book-name">{book.nome}</th>
                    <td>{book.tamanho}</td>
                    <td>
                      <span className={`book-status ${book.status}`}>
                        {(book.status === 'ready' || book.status === 'transferred') && (
                          <FaCheck aria-hidden="true" />
                        )}
                        {STATUS[book.status] ?? 'Aguardando'}
                      </span>
                    </td>
                    <td>
                      {book.status === 'transferred' ? (
                        <span className="transferred-button">Transferido</span>
                      ) : (
                        <button
                          type="button"
                          className="transfer-button"
                          disabled={book.status !== 'ready'}
                          onClick={() => onTransfer?.(book.id)}
                          aria-label={`Transferir ${book.nome}`}
                        >
                          Transferir
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}