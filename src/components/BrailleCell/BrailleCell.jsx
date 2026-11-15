import { useEffect, useRef, useState } from 'react'
import './brailleCell.css'
import { section } from 'motion/react-client'

// Alfabeto braille: números = pontos levantados (1-2-3 na coluna esquerda, 4-5-6 na direita)
const ALFABETO = {
    a: '1', b: '12', c: '14', d: '145', e: '15', f: '124', g: '1245',
    h: '125', i: '24', j: '245', k: '13', l: '123', m: '134', n: '1345',
    o: '135', p: '1234', q: '12345', r: '1235', s: '234', t: '2345',
    u: '136', v: '1236', w: '2456', x: '1346', y: '13456', z: '1356',
}

// Ordem em que os pontos aparecem na grade (2 colunas x 3 linhas)
const ORDEM_DA_GRADE = [1, 4, 2, 5, 3, 6]

// Cada ponto vira um bit: ponto 1 = bit 0, ponto 2 = bit 1, ...
const paraMascara = (pontos) =>
    [...pontos].reduce((mascara, p) => mascara | (1 << (Number(p) - 1)), 0)

const LETRA_POR_MASCARA = Object.fromEntries(
    Object.entries(ALFABETO).map(([letra, pontos]) => [paraMascara(pontos), letra.toUpperCase()])
)

const MASCARA_INICIAL = paraMascara(ALFABETO.l)
const PALAVRA = 'libraille'
const INTERVALO_MS = 800

export default function BrailleCell({ className = '' }) {
    const [mascara, setMascara] = useState(MASCARA_INICIAL)
    const [tocando, setTocando] = useState(false)
    const timerRef = useRef(null)

    const parar = () => {
        clearTimeout(timerRef.current)
        setTocando(false)
    }

    // Limpa o timer se o componente sair da tela
    useEffect(() => () => clearTimeout(timerRef.current), [])

    const alternarPonto = (ponto) => {
        parar()
        setMascara((atual) => atual ^ (1 << (ponto - 1)))
    }

    const limpar = () => {
        parar()
        setMascara(0)
    }

    const mostrarPalavra = () => {
        clearTimeout(timerRef.current)
        setTocando(true)
        let i = 0

        const proximo = () => {
            setMascara(paraMascara(ALFABETO[PALAVRA[i]]))
            i += 1
            timerRef.current = setTimeout(
                i < PALAVRA.length ? proximo : () => setTocando(false),
                INTERVALO_MS
            )
        }
        proximo()
    }

    const letra = LETRA_POR_MASCARA[mascara]
    const levantados = ORDEM_DA_GRADE.filter((p) => mascara & (1 << (p - 1))).sort()
    const caractereBraille = String.fromCodePoint(0x2800 + mascara)

    const status = letra
        ? `Letra ${letra}`
        : mascara === 0
            ? 'Nenhum ponto levantado'
            : 'Combinação sem letra correspondente'

    return (
        <section className={`braille-cell-section`} aria-labelledby="braille-cell-titulo">
            <h3 id="braille-cell-titulo">Experimente!</h3>
            <p>Pressione os pontos para formar letras.</p>
        <div className={`braille-cell ${className}`}>
            {/* <p id="braille-cell-titulo" className="braille-cell__title">
                Experimente: toque nos pontos
            </p> */}

            <div className="braille-cell__body">
                <div
                    className="braille-cell__grid"
                    role="group"
                    aria-labelledby="braille-cell-titulo"
                >
                    {ORDEM_DA_GRADE.map((ponto) => {
                        const levantado = Boolean(mascara & (1 << (ponto - 1)))
                        return (
                            <button
                                key={ponto}
                                type="button"
                                className="braille-dot"
                                aria-pressed={levantado}
                                aria-label={`Ponto ${ponto}`}
                                onClick={() => alternarPonto(ponto)}
                            >
                                <span className="braille-dot__pin" aria-hidden="true"></span>
                            </button>
                        )
                    })}
                </div>

                <div className="braille-cell__result">
                    <span className="braille-cell__letter" aria-hidden="true">
                        {letra ?? '?'}
                    </span>
                    <span className="braille-cell__glyph" aria-hidden="true">
                        {caractereBraille}
                    </span>

                    {/* Anunciado por leitores de tela a cada mudança */}
                    <p className="braille-cell__sr" role="status" aria-live="polite">
                        {status}
                        {levantados.length > 0 && `. Pontos levantados: ${levantados.join(', ')}`}
                    </p>
                </div>
            </div>

            <div className="braille-cell__actions">
                <button
                    type="button"
                    className="braille-cell__action braille-cell__action--primary"
                    onClick={mostrarPalavra}
                    disabled={tocando}
                >
                    {tocando ? 'Escrevendo…' : 'Ver "LiBraille"'}
                </button>
                <button
                    type="button"
                    className="braille-cell__action"
                    onClick={limpar}
                    disabled={mascara === 0 && !tocando}
                >
                    Limpar
                </button>
            </div>
        </div>
        </section>
    )
}