import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'
import './backToTop.css'

const MOSTRAR_APOS = 400   // pixels rolados antes de o botão aparecer

export default function BackToTop() {
  const [visivel, setVisivel] = useState(false)

  // Mostra o botão só depois de rolar um pouco
  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > MOSTRAR_APOS)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const voltarAoTopo = () => {
    // Leva o foco do teclado para o conteúdo principal antes de subir.
    // Sem isso, o botão some e o foco se perde (quem usa teclado ou leitor de tela teria que recomeçar).
    document.getElementById('conteudo')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0 })   // a rolagem suave vem do "scroll-behavior" do index.css
  }

  return (
    <button
      type="button"
      className={`back-to-top ${visivel ? 'is-visible' : ''}`}
      onClick={voltarAoTopo}
      aria-label="Voltar ao topo"
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  )
}