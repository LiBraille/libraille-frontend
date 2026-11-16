import "./syncedbooks.css";

export default function SyncedBooks({
    books = [],
    onTransfer,
    onDelete
}) {
    const getStatus = (status) => {
        switch (status){
            case "ready":
                return "Pronto"; 

            case "processing":
                return "Em processamento";

            case "transferred":
                return "Transferido";

            default:
                return "Aguardando";
        }
    };

    return(
        <section className="synced-books-section">
            <div className="synced-books-card">
                <div className="synced-books-header">
                    <h2>Livros Sincronizados</h2>
                    <p>Gerencie os livros adicionados à sua biblioteca</p>
                </div>

                {books.length === 0 ? (
                    <div className="synced-books-empty">
                        <h3>Nenhum livro adicionado</h3>
                        <p>Os livros que você adicionar aparecerão aqui</p>
                    </div>
                ):(
                    <div className="synced-books-table-container">
                        <table className="synced-books-table">
                            <thead>
                                <tr>
                                    <th>Nome do Arquivo</th>
                                    <th>Tamanho</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="book-name">{book.name}</td>
                                        <td>{book.size}</td>
                                        <td>
                                            <span className={`book-status ${book.status}`}>
                                                {book.status === "ready" && "✓"}
                                                {getStatus(book.status)}
                                            </span>
                                        </td>

                                        <td>
                                        <div className="book-actions">{book.status === "transferred" ? (
                                            <button className="transferred-button" disabled>Transferido</button>
                                        ):(
                                        <button className="transfer-button" disabled={book.status !== "ready"} onClick={() =>onTransfer?.(book.id)}>Transferir</button>
                                        )}
                                        
                                        <button className="delete-button" onClick={() => onDelete?.(book.id)} aria-label={`Excluir ${book.name}`} title="Excluir livro">🗑️</button>
                                        
                                        </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}