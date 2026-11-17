import { FaCheck, FaTrash } from 'react-icons/fa6'
import './syncedbooks.css'

const STATUS = {
  ready: 'Pronto',
  processing: 'Convertendo',
  transferring: 'Transferindo',
  transferred: 'Transferido',
}

export default function SyncedBooks({ books = [], onTransfer, onDelete }) {
  return (
    <section className="synced-books-section" aria-labelledby="synced-titulo">
      <div className="synced-books-card">
        <div className="synced-books-header">
          <h2 id="synced-titulo">Livros convertidos</h2>
          <p>
            Gerencie os livros desta sessão. Eles não ficam guardados: ao recarregar ou
            sair da página, a lista é apagada.
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
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  const ocupado = book.status === 'processing' || book.status === 'transferring'
                  return (
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
                        <div className="book-actions">
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
                          <button
                            type="button"
                            className="delete-button"
                            disabled={ocupado}
                            onClick={() => onDelete?.(book.id)}
                            aria-label={`Remover ${book.nome} da lista`}
                            title="Remover da lista"
                          >
                            <FaTrash aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}