import { useEffect } from 'react'

// Troca o título da aba do navegador. Uso: usePageTitle('Sobre')
export function usePageTitle(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | LiBraille` : 'LiBraille'
  }, [titulo])
}