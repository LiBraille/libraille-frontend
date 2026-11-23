import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Controla o que acontece quando a página muda:
// - link com # (ex.: /#faq): rola até o elemento com esse id
// - link normal: volta para o topo e leva o foco para o título (h1) da nova página
export default function ScrollToHash() {
    // "key" muda a cada clique em um link, mesmo que o endereço seja igual
    const { pathname, hash, key } = useLocation()
    const primeiraVez = useRef(true)

    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView()
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
        }

        // Na primeira carga do site não mexemos no foco
        if (primeiraVez.current) {
            primeiraVez.current = false
            return
        }

        // Troca de página: o leitor de tela anuncia o título da nova página
        if (!hash) {
            const alvo = document.querySelector('main h1') ?? document.getElementById('conteudo')
            if (alvo) {
                if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1')
                alvo.focus({ preventScroll: true })
            }
        }
    }, [pathname, hash, key])

    return null
}