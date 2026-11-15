import { useEffect, useRef } from 'react'

const DOT_GAP = 10          // distância entre pontos dentro da cela
const CELL_PAD_X = 24       // espaço horizontal entre celas
const CELL_PAD_Y = 22       // espaço vertical entre celas
const POINTER_RADIUS = 110  // alcance do mouse/toque
const AMBIENT_INTERVAL = 140 // ms entre mudanças espontâneas

const CELL_W = DOT_GAP + CELL_PAD_X
const CELL_H = DOT_GAP * 2 + CELL_PAD_Y

export default function BrailleBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const host = canvas.parentElement // a <section> da hero
        const ctx = canvas.getContext('2d')
        const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        let largura = 0
        let altura = 0
        let cols = 0
        let rows = 0
        let alvo = new Uint8Array(0)      // 1 = ponto levantado
        let nivel = new Float32Array(0)   // animação suave 0..1
        let corAtiva = '217 176 63'
        let corIdle = '253 251 247'
        const pointer = { x: -9999, y: -9999 }
        let rafId = 0
        let ultimaMudanca = 0
        let visivel = true

        const lerCores = () => {
            const css = getComputedStyle(canvas)
            corAtiva = css.getPropertyValue('--braille-active').trim() || corAtiva
            corIdle = css.getPropertyValue('--braille-idle').trim() || corIdle
        }

        const montarGrade = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const rect = host.getBoundingClientRect()
            largura = rect.width
            altura = rect.height
            canvas.width = largura * dpr
            canvas.height = altura * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            cols = Math.ceil(largura / CELL_W) + 1
            rows = Math.ceil(altura / CELL_H) + 1
            const total = cols * rows * 6
            alvo = new Uint8Array(total)
            nivel = new Float32Array(total)
            for (let i = 0; i < total; i++) {
                alvo[i] = Math.random() < 0.38 ? 1 : 0
                nivel[i] = alvo[i]
            }
        }

        const desenhar = () => {
            ctx.clearRect(0, 0, largura, altura)

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const baseIdx = (r * cols + c) * 6
                    const cx = c * CELL_W + CELL_PAD_X / 2
                    const cy = r * CELL_H + CELL_PAD_Y / 2

                    for (let d = 0; d < 6; d++) {
                        const x = cx + (d % 2) * DOT_GAP
                        const y = cy + Math.floor(d / 2) * DOT_GAP
                        const i = baseIdx + d

                        // suaviza a transição entre levantado/rebaixado
                        if (!reduzirMovimento) nivel[i] += (alvo[i] - nivel[i]) * 0.12

                        // influência do ponteiro
                        const dx = x - pointer.x
                        const dy = y - pointer.y
                        const dist = Math.hypot(dx, dy)
                        const boost = dist < POINTER_RADIUS ? 1 - dist / POINTER_RADIUS : 0

                        const raio = 1.4 + nivel[i] * 1.4 + boost * 2.2
                        const alpha = 0.12 + nivel[i] * 0.45 + boost * 0.55

                        ctx.beginPath()
                        ctx.arc(x, y, raio, 0, Math.PI * 2)
                        ctx.fillStyle =
                            nivel[i] > 0.5 || boost > 0.15
                                ? `rgb(${corAtiva} / ${Math.min(alpha, 1)})`
                                : `rgb(${corIdle} / ${alpha})`
                        ctx.fill()
                    }
                }
            }
        }

        const loop = (t) => {
            if (visivel) {
                // muda alguns pontos aleatoriamente de tempos em tempos
                if (t - ultimaMudanca > AMBIENT_INTERVAL) {
                    ultimaMudanca = t
                    for (let k = 0; k < 4; k++) {
                        const i = Math.floor(Math.random() * alvo.length)
                        alvo[i] = alvo[i] ? 0 : 1
                    }
                }
                desenhar()
            }
            rafId = requestAnimationFrame(loop)
        }

        const aoMoverPonteiro = (e) => {
            const rect = host.getBoundingClientRect()
            pointer.x = e.clientX - rect.left
            pointer.y = e.clientY - rect.top
        }
        const aoSairPonteiro = () => {
            pointer.x = -9999
            pointer.y = -9999
        }

        lerCores()
        montarGrade()

        if (reduzirMovimento) {
            desenhar() // versão estática, sem animação
        } else {
            rafId = requestAnimationFrame(loop)
            host.addEventListener('pointermove', aoMoverPonteiro)
            host.addEventListener('pointerleave', aoSairPonteiro)
        }

        // Recalcula a grade quando o tamanho da hero muda
        const resizeObserver = new ResizeObserver(() => {
            montarGrade()
            if (reduzirMovimento) desenhar()
        })
        resizeObserver.observe(host)

        // Pausa a animação quando a hero sai da tela (economiza bateria)
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => { visivel = entry.isIntersecting },
            { threshold: 0 }
        )
        intersectionObserver.observe(host)

        // Relê as cores quando o tema muda
        const themeObserver = new MutationObserver(() => {
            lerCores()
            if (reduzirMovimento) desenhar()
        })
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        })

        return () => {
            cancelAnimationFrame(rafId)
            host.removeEventListener('pointermove', aoMoverPonteiro)
            host.removeEventListener('pointerleave', aoSairPonteiro)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            themeObserver.disconnect()
        }
    }, [])

    return <canvas ref={canvasRef} className="braille-canvas" aria-hidden="true" />
}