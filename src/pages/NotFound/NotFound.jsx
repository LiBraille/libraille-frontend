import { Link } from 'react-router-dom'
import './notFound.css'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle("Página não encontrada")
  
  return (
    <section className="not-found">
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou abrir não existe ou foi movido.</p>
      <Link to="/" className="btn btn--primary">Voltar ao início</Link>
    </section>
  )
}