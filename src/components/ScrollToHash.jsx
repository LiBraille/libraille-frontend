import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Controla o scroll quando a página muda:
// - link com # (ex.: /#faq): rola até o elemento com esse id
// - link normal: volta para o topo
export default function ScrollToHash() {
    // "key" muda a cada clique em um link, mesmo que o endereço seja igual.
    // Sem ela, clicar de novo em /#faq não rolava de volta até a seção.
    const { pathname, hash, key } = useLocation()

    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView()
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' })
        }
    }, [pathname, hash, key])

    return null
}