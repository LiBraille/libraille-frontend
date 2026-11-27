import { useState } from 'react'
import { FaCheck, FaCartShopping } from 'react-icons/fa6'
import Reveal from '../Reveal/Reveal'
import OrderModal from '../OrderModal/OrderModal'
import './productBuy.css'

// CONFIRMAR com a equipe: esta lista precisa refletir o que realmente acompanha a compra
const INCLUSOS = [
    'Dispositivo LiBraille de leitura tátil',
    'Ativação de conta com acesso ao conversor do site',
    'Leitura de arquivos TXT e EPUB',
    'Conexão por cabo USB-C para transferência de livros',
]

export default function ProductBuy() {
    // modal controla qual formulário está aberto: null (fechado), 'compra' ou 'doacao'
    const [modal, setModal] = useState(null)

    return (
        <section id="comprar" className="buy" aria-labelledby="buy-titulo">
            <Reveal variant="scale" className="buy-card" data-surface="dark">
                <div className="buy-info">
                    <h2 id="buy-titulo" className="buy-title">Adquira o seu LiBraille</h2>
                    <p className="buy-lead">
                        Depois da compra, você ativa a sua conta e já pode converter seus livros e
                        documentos para ler no dispositivo.
                    </p>

                    <ul className="buy-list" role="list" aria-label="O que você recebe">
                        {INCLUSOS.map((item) => (
                            <li key={item}>
                                <FaCheck aria-hidden="true" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="buy-aside">
                    <p className="buy-note">
                        Quer ajudar alguém a ler? Você também pode doar um dispositivo.
                    </p>
                    <div className="buy-actions">
                        <button type="button" className="btn btn--primary" onClick={() => setModal('compra')}>
                            <FaCartShopping aria-hidden="true" />
                            Quero adquirir
                        </button>
                        <button type="button" className="buy-link" onClick={() => setModal('doacao')}>
                            Conheça a doação
                        </button>
                    </div>
                </div>
            </Reveal>

            {/* O modal fica fora do cartão escuro para seguir o tema escolhido pela pessoa */}
            <OrderModal
                aberto={modal !== null}
                aoFechar={() => setModal(null)}
                tipoInicial={modal ?? 'compra'}
            />
        </section>
    )
}