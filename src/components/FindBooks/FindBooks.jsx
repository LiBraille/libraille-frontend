import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import './findBooks.css'

// Cole aqui o endereço oficial e confira o nome da plataforma
export const MEC_LIVROS = {
    titulo: 'Livros gratuitos do MEC',
    url: 'https://meclivros.mec.gov.br/', 
}

export default function FindBooks() {
  if (!MEC_LIVROS.url) return null

  return (
    <aside className="find" aria-labelledby="find-titulo" data-surface="dark">
      <div>
        <h2 id="find-titulo" className="find__title">Ainda não tem um livro?</h2>
        <p className="find__text">
          Encontre obras gratuitas na plataforma do MEC e converta aqui. O conversor aceita
          somente EPUB e TXT, então escolha esses formatos ao baixar.
        </p>
      </div>
      <a
        className="btn btn--ghost"
        href={MEC_LIVROS.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {MEC_LIVROS.titulo}
        <FaArrowUpRightFromSquare aria-hidden="true" />
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </aside>
  )
}