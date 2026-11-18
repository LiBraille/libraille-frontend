import { Link } from 'react-router-dom'
import './notFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou abrir não existe ou foi movido.</p>
      <Link to="/" className="btn btn--primary">Voltar ao início</Link>
    </section>
  )
}