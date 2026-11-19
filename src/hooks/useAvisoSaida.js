import { useEffect } from 'react'

// Quando "ativo" for true, o navegador pergunta antes de recarregar ou fechar a aba
export function useAvisoSaida(ativo) {
  useEffect(() => {
    if (!ativo) return

    const aviso = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', aviso)
    return () => window.removeEventListener('beforeunload', aviso)
  }, [ativo])
}