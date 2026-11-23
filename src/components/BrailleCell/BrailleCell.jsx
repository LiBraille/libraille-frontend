import { useEffect, useRef, useState } from 'react'
import './brailleCell.css'

// Alfabeto braille: cada letra lista os pontos levantados.
// Os pontos 1-2-3 ficam na coluna da esquerda e 4-5-6 na da direita.
const ALFABETO = {
    a: '1', b: '12', c: '14', d: '145', e: '15', f: '124', g: '1245',
    h: '125', i: '24', j: '245', k: '13', l: '123', m: '134', n: '1345',
    o: '135', p: '1234', q: '12345', r: '1235', s: '234', t: '2345',
    u: '136', v: '1236', w: '2456', x: '1346', y: '13456', z: '1356',
}

// Ordem em que os pontos aparecem na grade (2 colunas x 3 linhas)
const ORDEM_DA_GRADE = [1, 4, 2, 5, 3, 6]

// Truque: guardamos os 6 pontos em UM número, onde cada ponto é um "bit".
// ponto 1 = bit 0, ponto 2 = bit 1... Assim "123" vira 7 (111 em binário).
const paraMascara = (pontos) =>
    [...pontos].reduce((mascara, p) => mascara | (1 << (Number(p) - 1)), 0)

// Dicionário inverso: dado o número, descobre a letra
const LETRA_POR_MASCARA = Object.fromEntries(
    Object.entries(ALFABETO).map(([letra, pontos]) => [paraMascara(pontos), letra.toUpperCase()])
)

const MASCARA_INICIAL = paraMascara(ALFABETO.l)   // começa mostrando a letra L
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

    // Liga ou desliga um ponto (o ^ inverte o bit)
    const alternarPonto = (ponto) => {
        parar()
        setMascara((atual) => atual ^ (1 << (ponto - 1)))
    }

    const limpar = () => {
        parar()
        setMascara(0)
    }

    // Mostra "libraille" uma letra por vez
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
    const levantados = ORDEM_DA_GRADE.filter((p) => mascara & (1 << (p - 1))).sort((a, b) => a - b)
    const caractereBraille = String.fromCodePoint(0x2800 + mascara)   // símbolo braille do Unicode

    const status = letra
        ? `Letra ${letra}`
        : mascara === 0
            ? 'Nenhum ponto levantado'
            : 'Combinação sem letra correspondente'

    return (
        <section className={`braille-cell-section ${className}`} aria-labelledby="braille-cell-titulo">
            <h3 id="braille-cell-titulo">Experimente!</h3>
            <p>Pressione os pontos para formar letras.</p>

            <div className="braille-cell">
                <div className="braille-cell__body">
                    <div className="braille-cell__grid" role="group" aria-labelledby="braille-cell-titulo">
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

                        {/* Leitores de tela anunciam este texto a cada mudança */}
                        <p className="sr-only" role="status">
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