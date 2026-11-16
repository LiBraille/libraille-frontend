import { useEffect, useId, useRef } from 'react'
import { FaXmark } from 'react-icons/fa6'
import './videoModal.css'

export default function VideoModal({ aberto, aoFechar, titulo, videoId }) {
    const ref = useRef(null)
    const titleId = useId()

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        if (aberto && !dialog.open) dialog.showModal()
        if (!aberto && dialog.open) dialog.close()
    }, [aberto])

    // Clicar no fundo escurecido (o próprio <dialog>) fecha
    const aoClicar = (e) => {
        if (e.target === ref.current) aoFechar()
    }

    return (
        <dialog
            ref={ref}
            className="video-modal"
            aria-labelledby={titleId}
            onClose={aoFechar}      // também dispara com a tecla Esc
            onClick={aoClicar}
        >
            <div className="video-modal__box">
                <header className="video-modal__header">
                    <h2 id={titleId} className="video-modal__title">{titulo}</h2>
                    <button
                        type="button"
                        className="video-modal__close"
                        onClick={aoFechar}
                        aria-label="Fechar vídeo"
                    >
                        <FaXmark aria-hidden="true" />
                    </button>
                </header>

                {/* O iframe só existe com o modal aberto: ao fechar, o vídeo para */}
                {aberto && (
                    <div className="video-modal__player">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
                            title={titulo}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </dialog>
    )
}